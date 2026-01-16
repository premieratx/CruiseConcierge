import { useState, useEffect } from 'react';

interface YouTubeVideoBackgroundProps {
  videoId: string;
  posterImage?: string;
}

// Detect if the current user agent is a bot/crawler
function isBot(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return true; // SSR - treat as bot
  }
  
  const botPatterns = [
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
    'yandexbot', 'sogou', 'exabot', 'facebot', 'ia_archiver',
    'linkedinbot', 'twitterbot', 'pinterestbot', 'lighthouse',
    'pagespeed', 'headlesschrome', 'puppeteer', 'crawl', 'spider', 'bot'
  ];
  
  const ua = navigator.userAgent.toLowerCase();
  return botPatterns.some(pattern => ua.includes(pattern));
}

export function YouTubeVideoBackground({ videoId, posterImage }: YouTubeVideoBackgroundProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only show video for non-bot users after component mounts
    if (!isBot()) {
      // Delay video load slightly to prioritize content
      const timer = setTimeout(() => setShowVideo(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Poster image - always visible as fallback for bots and while video loads */}
      {posterImage && (
        <img
          src={posterImage}
          alt="Hero background"
          className="w-full h-full object-cover absolute inset-0"
          loading="eager"
        />
      )}
      
      {/* YouTube iframe - only for non-bot clients after mount */}
      {isClient && showVideo && (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
          title="Hero background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '177.78vh',
            height: '56.25vw',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Gradient overlay on top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
    </div>
  );
}
