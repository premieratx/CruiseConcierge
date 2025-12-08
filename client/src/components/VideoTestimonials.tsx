import { useState } from 'react';
import { useLocation } from 'wouter';
import { Play, Quote, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VideoTestimonial {
  id: string;
  name: string;
  event: string;
  location?: string;
  rating: number;
  thumbnailUrl: string;
  videoUrl: string; // YouTube embed URL
  quote: string;
  date?: string;
}

interface VideoTestimonialsProps {
  testimonials?: VideoTestimonial[];
  title?: string;
  description?: string;
  className?: string;
}

const defaultTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    name: 'Jessica & The Girls',
    event: 'Bachelorette Party',
    location: 'Dallas, TX',
    rating: 5,
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quote: 'This was hands down the BEST part of our Austin bachelorette weekend! The DJ was amazing and everyone had a blast!',
    date: 'May 2024',
  },
  {
    id: '2',
    name: 'Mike & The Bachelor Crew',
    event: 'Bachelor Party',
    location: 'Houston, TX',
    rating: 5,
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quote: 'Epic experience! The ATX Disco Cruise exceeded all expectations. Highly recommend for any bachelor party.',
    date: 'June 2024',
  },
  {
    id: '3',
    name: 'Corporate Team from Dell',
    event: 'Team Building Event',
    location: 'Austin, TX',
    rating: 5,
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quote: 'Perfect team building activity! Our entire department loved it. Professional crew and amazing vibes.',
    date: 'April 2024',
  },
];

export function VideoTestimonials({
  testimonials = defaultTestimonials,
  title = "See Why Our Guests Love Us",
  description = "Real stories from real parties. Watch what makes Premier Party Cruises the #1 choice for Lake Travis celebrations.",
  className,
}: VideoTestimonialsProps) {
  const [, navigate] = useLocation();
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);

  return (
    <section className={cn("py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800", className)}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 font-sans tracking-wider uppercase bg-brand-yellow text-black px-6 py-2">
            <Star className="w-4 h-4 mr-2 inline fill-current" />
            Video Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                {/* Video Thumbnail */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => setSelectedVideo(testimonial)}
                      data-testid={`video-thumbnail-${testimonial.id}`}
                    >
                      <div className="aspect-video bg-gray-900 relative overflow-hidden">
                        <img
                          src={testimonial.thumbnailUrl}
                          alt={`${testimonial.name} - ${testimonial.event}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          width={400}
                          height={225}
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                          <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-brand-yellow flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                            <Play className="h-10 w-10 text-brand-blue fill-current ml-1" />
                          </div>
                        </div>
                        {/* Event Badge */}
                        <Badge className="absolute top-3 left-3 bg-brand-blue text-white">
                          {testimonial.event}
                        </Badge>
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-4xl p-0 bg-black">
                    <div className="aspect-video">
                      {selectedVideo && (
                        <iframe
                          src={`${selectedVideo.videoUrl}?autoplay=1`}
                          title={`${selectedVideo.name} testimonial`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          data-testid="video-player"
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Content */}
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="mb-4">
                    <Quote className="h-6 w-6 text-brand-blue opacity-30 mb-2" />
                    <p className="text-gray-700 dark:text-gray-300 italic line-clamp-3">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                    {testimonial.location && (
                      <p className="text-sm text-gray-700 dark:text-gray-300">{testimonial.location}</p>
                    )}
                    {testimonial.date && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{testimonial.date}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Ready to create your own unforgettable experience?
          </p>
          <div
            className="xola-custom xola-checkout inline-block"
            data-button-id="691574bd162501edc00f151a"
            data-testid="button-testimonials-book-now"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue/90 hover:to-purple-600/90 text-white font-bold px-8 py-6 text-lg"
            >
              Book Your Cruise Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
