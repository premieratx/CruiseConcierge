import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
}

interface VideoGallerySectionProps {
  videos: VideoItem[];
  title?: string;
  description?: string;
}

export default function VideoGallerySection({ 
  videos, 
  title = "Watch Our Lake Travis Experiences",
  description 
}: VideoGallerySectionProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handlePlayClick = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50" data-testid="video-gallery-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4" data-testid="video-gallery-title">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-testid="video-gallery-description">
              {description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`video-card-${index}`}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white border-2 border-blue-100">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-900">
                    {playingVideo === video.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="autoplay; encrypted-media"
                        className="w-full h-full"
                        data-testid={`video-iframe-${index}`}
                      />
                    ) : (
                      <button
                        onClick={() => handlePlayClick(video.id)}
                        className="w-full h-full relative group cursor-pointer"
                        data-testid={`video-play-button-${index}`}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={480}
                          height={270}
                          data-testid={`video-thumbnail-${index}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-yellow-400 rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <Play className="w-12 h-12 text-blue-900 fill-blue-900" data-testid={`video-play-icon-${index}`} />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-6 bg-gradient-to-b from-white to-blue-50">
                    <h3 className="text-xl font-bold text-blue-900 mb-2" data-testid={`video-title-${index}`}>
                      {video.title}
                    </h3>
                    <p className="text-gray-600" data-testid={`video-description-${index}`}>
                      {video.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
