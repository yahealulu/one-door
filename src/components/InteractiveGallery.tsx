import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InteractiveGalleryProps {
  images: string[];
  title: string;
}

const InteractiveGallery = ({ images, title }: InteractiveGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Update selected image
  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Navigate to next image
  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Navigate to previous image
  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (images.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center">
        <span className="text-primary text-sm font-medium">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="relative aspect-video md:aspect-square overflow-hidden rounded-xl bg-background">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === selectedImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {image.startsWith('/placeholder') ? (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                <span className="text-primary text-sm font-medium">
                  Image {image.match(/\d+/)?.[0]}
                </span>
              </div>
            ) : (
              <img
                src={image}
                alt={`${title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
        
        {/* Navigation Arrows (only shown on desktop or when there are multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary md:opacity-70"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary md:opacity-70"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-background/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-foreground">
            {selectedImageIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="relative">
          {isMobile ? (
            // Mobile: Swipeable carousel
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === selectedImageIndex 
                      ? 'border-primary scale-105' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  {image.startsWith('/placeholder') ? (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                      <span className="text-primary text-xs">
                        {image.match(/\d+/)?.[0]}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          ) : (
            // Desktop: Horizontal scrollable thumbnails
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === selectedImageIndex 
                      ? 'border-primary scale-105' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  {image.startsWith('/placeholder') ? (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                      <span className="text-primary text-xs">
                        {image.match(/\d+/)?.[0]}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveGallery;