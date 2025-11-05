interface YouTubeHeroEmbedProps {
  videoId: string;
  title?: string;
}

export default function YouTubeHeroEmbed({ videoId, title }: YouTubeHeroEmbedProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0`;

  return (
    <div className="w-full bg-black" data-testid="youtube-hero-embed">
      <div className="container mx-auto px-4">
        <div className="aspect-video w-full max-w-6xl mx-auto">
          <iframe
            src={embedUrl}
            title={title || "Premier Party Cruises Video"}
            allow="autoplay; encrypted-media"
            className="w-full h-full"
            data-testid="youtube-hero-iframe"
          />
        </div>
      </div>
    </div>
  );
}
