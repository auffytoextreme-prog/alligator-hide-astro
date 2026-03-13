import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, VolumeX, Volume1, Play, Pause, SkipBack, SkipForward, Maximize2, Minimize2 } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title?: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const savedTimeRef = useRef(0);
  const wasPlayingRef = useRef(true);

  const applyVolume = useCallback((vol: number) => {
    if (videoRef.current) {
      videoRef.current.volume = vol;
      videoRef.current.muted = vol === 0;
    }
    setVolume(vol);
  }, []);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
  }, [resetHideTimer]);

  // Escape key + lock scroll when fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exitFullscreen();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Restore video position after fullscreen toggle
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || savedTimeRef.current === 0) return;
    video.currentTime = savedTimeRef.current;
    video.volume = volume;
    video.muted = volume === 0;
    if (wasPlayingRef.current) video.play().catch(() => {});
  }, [isFullscreen]);

  const saveVideoState = () => {
    if (videoRef.current) {
      savedTimeRef.current = videoRef.current.currentTime;
      wasPlayingRef.current = !videoRef.current.paused;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };

  const handleScreenClick = () => {
    resetHideTimer();
    togglePlay();
  };

  const seek = (delta: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + delta));
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressRef.current || !videoRef.current?.duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * videoRef.current.duration;
  };

  const enterFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    saveVideoState();
    setIsFullscreen(true);
  };

  const exitFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    saveVideoState();
    setIsFullscreen(false);
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const renderControls = (fsMode: boolean) => (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent ${fsMode ? 'px-6 pb-6 pt-12' : 'px-4 pb-4 pt-10'} transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="w-full py-2 mb-1 cursor-pointer"
        onClick={handleProgressClick}
      >
        <div className="w-full h-1.5 bg-white/30 rounded-full">
          <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Buttons row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={(e) => seek(-10, e)} className="p-2 text-white/80 hover:text-white transition-colors" aria-label="Retroceder 10 segundos">
            <SkipBack className={fsMode ? 'w-6 h-6' : 'w-5 h-5'} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className={`flex items-center justify-center ${fsMode ? 'w-12 h-12' : 'w-11 h-11'} bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors`}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying
              ? <Pause className={fsMode ? 'w-5 h-5' : 'w-4 h-4'} />
              : <Play className={`${fsMode ? 'w-5 h-5' : 'w-4 h-4'} ml-0.5`} />
            }
          </button>
          <button onClick={(e) => seek(10, e)} className="p-2 text-white/80 hover:text-white transition-colors" aria-label="Avanzar 10 segundos">
            <SkipForward className={fsMode ? 'w-6 h-6' : 'w-5 h-5'} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => applyVolume(volume === 0 ? 0.7 : 0)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label={volume === 0 ? 'Activar audio' : 'Silenciar'}
            >
              <VolumeIcon className="w-4 h-4" />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => applyVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-white cursor-pointer"
              aria-label="Volumen"
            />
          </div>
          <button
            onClick={fsMode ? exitFullscreen : enterFullscreen}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label={fsMode ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {fsMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Inline video player */}
      <div
        className="relative rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 cursor-pointer"
        onMouseMove={!isFullscreen ? resetHideTimer : undefined}
        onClick={!isFullscreen ? handleScreenClick : undefined}
      >
        {!isFullscreen ? (
          <video
            ref={videoRef}
            className="w-full aspect-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={src} type="video/mp4" />
            Su navegador no soporta video HTML5.
          </video>
        ) : (
          <div className="aspect-video bg-black" />
        )}
        {!isFullscreen && renderControls(false)}
      </div>

      {/* Fullscreen overlay via portal */}
      {isFullscreen && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer"
          onClick={handleScreenClick}
          onMouseMove={resetHideTimer}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            muted
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={src} type="video/mp4" />
          </video>
          {renderControls(true)}
        </div>,
        document.body
      )}
    </>
  );
}
