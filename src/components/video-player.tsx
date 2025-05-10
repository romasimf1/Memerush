interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

export default function VideoPlayer({ src, autoPlay = true, loop = true, muted = true, className = "" }: VideoPlayerProps) {
  return (
    <video
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls
      className={className + " w-full h-full object-cover rounded-xl"}
    />
  );
} 