import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Play, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  description,
  thumbnail
}: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  // Extract video ID and type from URL
  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0&modestbranding=1`
      };
    }

    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return {
        type: 'vimeo',
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`
      };
    }

    // Direct video URL
    return {
      type: 'direct',
      embedUrl: url
    };
  };

  const videoInfo = getVideoEmbedUrl(videoUrl);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
          event.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'm':
        case 'M':
          setIsMuted(!isMuted);
          break;
        case 'f':
        case 'F':
          setIsFullscreen(!isFullscreen);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isPlaying, isMuted, isFullscreen, onClose]);

  // Auto-hide controls
  const resetControlsTimeout = () => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }

    setShowControls(true);
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
  };

  useEffect(() => {
    if (isOpen && isPlaying) {
      resetControlsTimeout();
    }

    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [isOpen, isPlaying]);

  const handleMouseMove = () => {
    if (isPlaying) {
      resetControlsTimeout();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
        data-testid="video-modal-overlay"
      >
        {/* Close button */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute top-6 right-6 z-60"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-12 w-12 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm"
                data-testid="button-video-close"
              >
                <X className="h-6 w-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video container */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <motion.div
            className={`relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden ${
              isFullscreen ? 'fixed inset-0 max-w-none rounded-none' : ''
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="video-container"
          >
            {videoInfo.type === 'direct' ? (
              <video
                className="w-full h-full object-cover"
                poster={thumbnail}
                controls={showControls}
                autoPlay
                muted={isMuted}
                data-testid="direct-video-player"
              >
                <source src={videoInfo.embedUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={videoInfo.embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid={`${videoInfo.type}-iframe`}
              />
            )}

            {/* Custom controls overlay for direct videos */}
            {videoInfo.type === 'direct' && (
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:bg-white/10 p-2"
                          data-testid="button-video-play-pause"
                        >
                          <Play className="h-5 w-5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMuted(!isMuted)}
                          className="text-white hover:bg-white/10 p-2"
                          data-testid="button-video-mute"
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-white hover:bg-white/10 p-2"
                        data-testid="button-video-fullscreen"
                      >
                        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </div>

        {/* Video info */}
        {(title || description) && (
          <AnimatePresence>
            {showControls && !isFullscreen && (
              <motion.div
                className="absolute bottom-6 left-6 right-6 max-w-2xl mx-auto text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {title && (
                  <h3 className="text-2xl font-bold mb-2" data-testid="video-title">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-gray-300" data-testid="video-description">
                    {description}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
}