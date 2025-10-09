import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export interface TranscriptionResult {
  text: string;
  confidence?: number;
  language?: string;
  processingTime: number;
}

export interface WisprFlowOptions {
  language?: string;
  enableAutoEdit?: boolean;
  enablePunctuation?: boolean;
  model?: string;
}

export class WisprFlowService {
  private apiKey: string | null;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = process.env.WISPR_FLOW_API_KEY || null;
    this.apiEndpoint = 'https://api.wisprflow.ai/v1/transcribe';
  }

  /**
   * Check if Wispr Flow service is available
   */
  isAvailable(): boolean {
    return Boolean(this.apiKey);
  }

  /**
   * Transcribe audio using Wispr Flow API
   */
  async transcribe(
    audioData: string, 
    options: WisprFlowOptions = {}
  ): Promise<TranscriptionResult> {
    const startTime = Date.now();

    if (!this.isAvailable()) {
      throw new Error('Wispr Flow API key not configured');
    }

    try {
      console.log('🎤 Starting Wispr Flow transcription');
      
      const requestBody = {
        audio: audioData, // base64 encoded 16kHz PCM WAV
        language: options.language || 'en',
        enable_auto_edit: options.enableAutoEdit ?? true,
        enable_punctuation: options.enablePunctuation ?? true,
        model: options.model || 'whisper-large-v3'
      };

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Wispr Flow API error:', response.status, errorText);
        throw new Error(`Wispr Flow API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Wispr Flow transcription successful');

      return {
        text: result.text || '',
        confidence: result.confidence,
        language: result.language,
        processingTime: Date.now() - startTime
      };

    } catch (error: any) {
      console.error('❌ Wispr Flow transcription failed:', error);
      throw new Error(`Transcription failed: ${error.message}`);
    }
  }

  /**
   * Convert WebM audio to 16kHz PCM WAV format required by Wispr Flow
   */
  async convertWebMToWav(webmBuffer: Buffer): Promise<string> {
    const tempDir = tmpdir();
    const inputFile = join(tempDir, `input_${Date.now()}.webm`);
    const outputFile = join(tempDir, `output_${Date.now()}.wav`);

    try {
      // Write WebM buffer to temporary file
      await fs.writeFile(inputFile, webmBuffer);

      // Convert using FFmpeg to 16kHz PCM WAV
      await this.runFFmpeg([
        '-i', inputFile,
        '-acodec', 'pcm_s16le',
        '-ar', '16000',
        '-ac', '1',
        '-f', 'wav',
        outputFile
      ]);

      // Read converted WAV file and encode to base64
      const wavBuffer = await fs.readFile(outputFile);
      const base64Audio = wavBuffer.toString('base64');

      // Clean up temporary files
      await Promise.all([
        fs.unlink(inputFile).catch(() => {}),
        fs.unlink(outputFile).catch(() => {})
      ]);

      return base64Audio;

    } catch (error: any) {
      // Clean up on error
      await Promise.all([
        fs.unlink(inputFile).catch(() => {}),
        fs.unlink(outputFile).catch(() => {})
      ]);
      
      console.error('❌ Audio conversion failed:', error);
      throw new Error(`Audio conversion failed: ${error.message}`);
    }
  }

  /**
   * Run FFmpeg command as promise
   */
  private runFFmpeg(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const ffmpeg = spawn('ffmpeg', args);
      
      let stderr = '';
      ffmpeg.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      ffmpeg.on('error', (error) => {
        reject(new Error(`FFmpeg spawn error: ${error.message}`));
      });

      ffmpeg.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg exited with code ${code}: ${stderr}`));
        }
      });
    });
  }

  /**
   * Validate audio format and size
   */
  validateAudioData(audioData: string): { valid: boolean; error?: string } {
    if (!audioData) {
      return { valid: false, error: 'No audio data provided' };
    }

    // Check if it's valid base64
    try {
      const buffer = Buffer.from(audioData, 'base64');
      
      // Check reasonable size limits (1MB to 50MB)
      const sizeInMB = buffer.length / (1024 * 1024);
      if (sizeInMB < 0.001) {
        return { valid: false, error: 'Audio file too small' };
      }
      if (sizeInMB > 50) {
        return { valid: false, error: 'Audio file too large (max 50MB)' };
      }

      return { valid: true };

    } catch (error) {
      return { valid: false, error: 'Invalid base64 audio data' };
    }
  }
}

// Export singleton instance
export const wisprFlowService = new WisprFlowService();

/**
 * Browser Speech Recognition Fallback Service
 * This runs on the frontend as a fallback when Wispr Flow is unavailable
 */
export interface BrowserSpeechOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export class BrowserSpeechService {
  private recognition: any = null;
  private isSupported: boolean;

  constructor() {
    // Check if browser supports speech recognition
    this.isSupported = typeof window !== 'undefined' && 
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  isAvailable(): boolean {
    return this.isSupported;
  }

  async transcribe(options: BrowserSpeechOptions = {}): Promise<string> {
    if (!this.isSupported) {
      throw new Error('Speech recognition not supported in this browser');
    }

    return new Promise((resolve, reject) => {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();

      this.recognition.continuous = options.continuous ?? false;
      this.recognition.interimResults = options.interimResults ?? false;
      this.recognition.lang = options.language || 'en-US';
      this.recognition.maxAlternatives = options.maxAlternatives || 1;

      this.recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        resolve(transcript.trim());
      };

      this.recognition.onerror = (event: any) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        // If no result was captured, resolve with empty string
        resolve('');
      };

      this.recognition.start();
    });
  }

  stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}