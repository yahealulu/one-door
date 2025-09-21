import { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Don't immediately call onComplete - let the video play for 2.5 seconds
    
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
        onComplete(); // Call onComplete after the fade out animation
      }, 500); // Give time for fade out animation
    }, 2500); // Increased to 2.5 seconds as requested

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleVideoEnd = () => {
    // If video ends naturally, start the exit animation
    setIsExiting(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 500);
  };

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {isMobile ? (
        // Simplified and Beautiful Mobile Loader
        <div className="flex flex-col items-center justify-center w-full h-full bg-background">
          {/* Logo */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
              one<span className="text-foreground">door</span>
            </h1>
          </div>
          
          {/* Simplified Loading Indicator */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          {/* Loading Text */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
              Loading experience...
            </p>
          </div>
        </div>
      ) : (
        // Desktop: Original video
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
        >
          <source src="/assets/loader.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Loader;