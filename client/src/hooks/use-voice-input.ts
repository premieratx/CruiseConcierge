import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export interface VoiceInputState {
  isRecording: boolean;
  isProcessing: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  hasPermission: boolean;
}

export interface VoiceInputActions {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  clearTranscript: () => void;
  requestPermission: () => Promise<boolean>;
}

export interface UseVoiceInputOptions {
  onTranscript?: (text: string) => void;
  language?: string;
  maxDuration?: number; // in seconds
  fallbackToBrowser?: boolean;
}

export function useVoiceInput(options: UseVoiceInputOptions = {}): VoiceInputState & VoiceInputActions {
  const {
    onTranscript,
    language = 'en',
    maxDuration = 30,
    fallbackToBrowser = true
  } = options;

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fallbackRecognitionRef = useRef<any>(null);

  const { toast } = useToast();

  // Check if browser supports required features
  const isSupported = Boolean(
    navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== 'undefined'
  );

  // Request microphone permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (!isSupported) {
        throw new Error('Voice input not supported in this browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately, just checking permission
      
      setHasPermission(true);
      setError(null);
      return true;
    } catch (err: any) {
      console.error('❌ Microphone permission denied:', err);
      setHasPermission(false);
      setError('Microphone permission required for voice input');
      
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice input",
        variant: "destructive"
      });
      
      return false;
    }
  }, [isSupported, toast]);

  // Convert audio blob to base64 for API transmission
  const convertBlobToBase64 = useCallback((blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:audio/webm;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, []);

  // Transcribe using Wispr Flow API
  const transcribeWithWispr = useCallback(async (audioBlob: Blob): Promise<string> => {
    try {
      console.log('🎤 Starting Wispr Flow transcription');
      const base64Audio = await convertBlobToBase64(audioBlob);
      
      const response = await apiRequest('POST', '/api/voice/transcribe', {
        audioData: base64Audio,
        language
      });

      if (response.success && response.text) {
        console.log('✅ Wispr Flow transcription successful:', response.text);
        return response.text.trim();
      } else {
        throw new Error(response.error || 'No transcription result');
      }
    } catch (err: any) {
      console.error('❌ Wispr Flow transcription failed:', err);
      throw err;
    }
  }, [convertBlobToBase64, language]);

  // Fallback to browser speech recognition
  const transcribeWithBrowser = useCallback(async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Browser speech recognition not available'));
        return;
      }

      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      
      if (!SpeechRecognition) {
        reject(new Error('Browser speech recognition not supported'));
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'en' ? 'en-US' : `${language}-${language.toUpperCase()}`;
      recognition.maxAlternatives = 1;

      fallbackRecognitionRef.current = recognition;

      recognition.onresult = (event: any) => {
        if (event.results.length > 0) {
          const transcript = event.results[0][0].transcript;
          console.log('✅ Browser speech recognition successful:', transcript);
          resolve(transcript.trim());
        } else {
          resolve('');
        }
      };

      recognition.onerror = (event: any) => {
        console.error('❌ Browser speech recognition error:', event.error);
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      recognition.onend = () => {
        if (fallbackRecognitionRef.current) {
          fallbackRecognitionRef.current = null;
        }
      };

      try {
        recognition.start();
        console.log('🎤 Started browser speech recognition');
      } catch (err) {
        reject(err);
      }
    });
  }, [language]);

  // Start recording
  const startRecording = useCallback(async (): Promise<void> => {
    try {
      if (isRecording || isProcessing) {
        console.warn('Recording already in progress');
        return;
      }

      // Clear any previous errors or transcripts
      setError(null);
      setTranscript('');

      // Check permission first
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        return;
      }

      console.log('🎤 Starting voice recording');

      // Get audio stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000 // Prefer 16kHz for Wispr Flow
        }
      });

      streamRef.current = stream;

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm' // WebM format, will convert to WAV server-side
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log('🎤 Recording stopped, processing audio');
        setIsRecording(false);
        setIsProcessing(true);

        try {
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            
            // Try Wispr Flow first, then fallback to browser
            let transcribedText = '';
            
            try {
              transcribedText = await transcribeWithWispr(audioBlob);
            } catch (wisprError) {
              console.warn('⚠️ Wispr Flow failed, trying browser fallback:', wisprError);
              
              if (fallbackToBrowser) {
                try {
                  transcribedText = await transcribeWithBrowser();
                } catch (browserError) {
                  console.error('❌ Both transcription methods failed');
                  throw new Error('Voice transcription unavailable. Please try typing instead.');
                }
              } else {
                throw wisprError;
              }
            }

            if (transcribedText) {
              setTranscript(transcribedText);
              onTranscript?.(transcribedText);
              
              toast({
                title: "Voice Input Successful",
                description: `Transcribed: "${transcribedText.substring(0, 50)}${transcribedText.length > 50 ? '...' : ''}"`,
              });
            } else {
              throw new Error('No speech detected. Please try speaking more clearly.');
            }
          } else {
            throw new Error('No audio data recorded');
          }
        } catch (err: any) {
          console.error('❌ Transcription failed:', err);
          setError(err.message);
          
          toast({
            title: "Voice Input Failed",
            description: err.message,
            variant: "destructive"
          });
        } finally {
          setIsProcessing(false);
        }
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);

      // Auto-stop after maxDuration
      if (maxDuration > 0) {
        timeoutRef.current = setTimeout(() => {
          if (mediaRecorderRef.current?.state === 'recording') {
            console.log(`⏰ Auto-stopping recording after ${maxDuration}s`);
            stopRecording();
          }
        }, maxDuration * 1000);
      }

      console.log('✅ Voice recording started');

    } catch (err: any) {
      console.error('❌ Failed to start recording:', err);
      setError(err.message);
      setIsRecording(false);
      setIsProcessing(false);

      toast({
        title: "Recording Failed",
        description: err.message,
        variant: "destructive"
      });
    }
  }, [isRecording, isProcessing, requestPermission, onTranscript, transcribeWithWispr, transcribeWithBrowser, fallbackToBrowser, maxDuration, toast]);

  // Stop recording
  const stopRecording = useCallback(async (): Promise<void> => {
    try {
      console.log('🛑 Stopping voice recording');

      // Clear auto-stop timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Stop browser fallback recognition if running
      if (fallbackRecognitionRef.current) {
        fallbackRecognitionRef.current.stop();
        fallbackRecognitionRef.current = null;
      }

      // Stop media recorder
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }

      // Stop audio stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      // Clean up refs
      mediaRecorderRef.current = null;

    } catch (err: any) {
      console.error('❌ Error stopping recording:', err);
      setError(err.message);
      setIsRecording(false);
      setIsProcessing(false);
    }
  }, []);

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (fallbackRecognitionRef.current) {
      fallbackRecognitionRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  // Auto-cleanup on unmount
  useState(() => {
    return cleanup;
  });

  return {
    // State
    isRecording,
    isProcessing,
    transcript,
    error,
    isSupported,
    hasPermission,
    
    // Actions
    startRecording,
    stopRecording,
    clearTranscript,
    requestPermission
  };
}