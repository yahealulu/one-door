import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Calendar, MapPin, Award, ChevronLeft } from 'lucide-react';
import MobileFriendlyGallery from '../components/MobileFriendlyGallery';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData } from '../data/timelineData';

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

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<TimelineItem | null>(null);
  const [exitAnimation, setExitAnimation] = useState(false);
  
  // Find the event based on the ID from URL params
  useEffect(() => {
    if (eventId) {
      const foundEvent = timelineData.find(item => item.id === eventId);
      setEvent(foundEvent || null);
    }
  }, [eventId]);

  // Handle back navigation with animation
  const handleBack = () => {
    setExitAnimation(true);
    setTimeout(() => {
      navigate('/#activities');
    }, 300); // Match this with animation duration
  };

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBack();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // If no event found, show a simple message
  if (!event) {
    return (
      <motion.div 
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Activities</span>
            </button>
            
            <h1 className="text-3xl font-bold text-gradient mb-4">
              Event Not Found
            </h1>
            <p className="text-muted-foreground">
              The event you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Use a default icon if none is provided
  const IconComponent = event.icon || Award;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 py-8 md:py-16">
          {/* Back Button */}
          <motion.button
            onClick={handleBack}
            className="mb-8 flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Activities</span>
          </motion.button>

          {/* Event Header */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 mx-auto shadow-glow">
              <IconComponent className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-6">
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
          </motion.div>

          {/* Gallery */}
          {event.images && event.images.length > 0 && (
            <motion.div 
              className="mb-12 max-w-4xl mx-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <MobileFriendlyGallery 
                images={event.images} 
                title={event.title} 
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div 
            className="glass p-8 rounded-2xl max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
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
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetailsPage;