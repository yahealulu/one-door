import React from 'react';
import { X, Calendar, MapPin, Award } from 'lucide-react';
import MobileFriendlyGallery from './MobileFriendlyGallery';

interface TimelineItem {
  id: string;
  type: 'exhibition' | 'news';
  title: string;
  date: string;
  location?: string;
  content: string;
  images: string[];
  icon: any;
  isNested?: boolean;
}

interface EventDetailsViewProps {
  event: TimelineItem | null;
  onClose: () => void;
  isOpen: boolean;
}

const EventDetailsView: React.FC<EventDetailsViewProps> = ({ event, onClose, isOpen }) => {
  console.log('EventDetailsView rendered with:', { event, isOpen });
  
  // Handle escape key press
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      // Restore background scrolling
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // If no event data, show a simple message
  if (!event) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="min-h-screen pb-20">
          {/* Header with close button */}
          <div className="sticky top-0 z-10 glass-light backdrop-blur-xl border-b border-border/50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div></div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close event details"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gradient mb-4">
                Event Details
              </h1>
              <p className="text-muted-foreground">
                No event data available.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Use a default icon if none is provided
  const IconComponent = event.icon || Award;

  return (
    <div className="fixed inset-0 z-[9999] bg-background overflow-y-auto">
      <div className="min-h-screen pb-20">
        {/* Header with close button */}
        <div className="sticky top-0 z-10 glass-light backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div></div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close event details"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Event Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 mx-auto">
              <IconComponent className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              {event.title}
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{event.date}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm">{event.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          {event.images && event.images.length > 0 && (
            <div className="mb-12">
              <MobileFriendlyGallery 
                images={event.images} 
                title={event.title} 
              />
            </div>
          )}

          {/* Content */}
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              {event.content.split('\n\n').map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className="text-muted-foreground leading-relaxed mb-6 last:mb-0 text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsView;