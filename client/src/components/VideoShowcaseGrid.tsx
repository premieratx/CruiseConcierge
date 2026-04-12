import { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface VideoShowcaseItem {
  src: string;
  title: string;
  poster?: string;
}

interface VideoShowcaseGridProps {
  videos: VideoShowcaseItem[];
  title?: string;
  subtitle?: string;
}

export default function VideoShowcaseGrid({
  videos,
  title,
  subtitle,
}: VideoShowcaseGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    const videos = gridVideoRefs.current;
    videos.forEach((video) => {
      if (video) observerRef.current!.observe(video);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;
    gridVideoRefs.current.forEach((video) => {
      if (video) {
        observer.unobserve(video);
        observer.observe(video);
      }
    });
  }, [videos]);

  const openLightbox = useCallback((index: number) => {
    gridVideoRefs.current.forEach((v) => v?.pause());
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setTimeout(() => {
      gridVideoRefs.current.forEach((v) => {
        if (v) observerRef.current?.observe(v);
      });
    }, 100);
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null && lightboxVideoRef.current) {
      lightboxVideoRef.current.play().catch(() => {});
    }
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (lightboxIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox]);

  return (
    <>
      <section className="py-10 md:py-14 bg-black">
        <div className="max-w-5xl mx-auto px-4" ref={containerRef}>
          {title && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-center text-gray-300 text-sm md:text-base mb-6 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {videos.slice(0, 4).map((video, index) => (
              <div
                key={index}
                className="relative rounded-lg md:rounded-xl overflow-hidden cursor-pointer group aspect-[9/16] md:aspect-video"
                onClick={() => openLightbox(index)}
              >
                {video.src ? (
                  <video
                    ref={(el) => { gridVideoRefs.current[index] = el; }}
                    src={video.src}
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={video.poster}
                    className="w-full h-full object-cover"
                    style={{ willChange: 'auto' }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white/50 text-xs md:text-sm font-medium">Video {index + 1}</p>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 md:p-4 shadow-xl">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {video.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 md:p-3">
                    <p className="text-white text-xs md:text-sm font-medium truncate">{video.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            aria-label="Close"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {videos[lightboxIndex].src ? (
              <video
                ref={lightboxVideoRef}
                src={videos[lightboxIndex].src}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[85vh] rounded-lg object-contain"
              />
            ) : (
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <p className="text-white/50 text-lg">Video coming soon</p>
              </div>
            )}
            {videos[lightboxIndex].title && (
              <p className="text-white text-center mt-3 text-sm md:text-base font-medium">
                {videos[lightboxIndex].title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
