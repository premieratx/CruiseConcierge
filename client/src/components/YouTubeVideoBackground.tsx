interface YouTubeVideoBackgroundProps {
  videoId: string;
  posterImage?: string;
}

export function YouTubeVideoBackground({ videoId, posterImage }: YouTubeVideoBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      {/* Poster image as guaranteed fallback */}
      {posterImage && (
        <img
          src={posterImage}
          alt="Hero background"
          className="w-full h-full object-cover"
          loading="eager"
        />
      )}
      
      {/* YouTube iframe as enhancement */}
      <iframe
        className="w-full h-full object-cover absolute inset-0"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
        title="Hero background video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          objectFit: 'cover'
        }}
      />
      
      {/* Gradient overlay on top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
    </div>
  );
}
