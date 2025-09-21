import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LoaderContext } from '../App';
import Loader from '../components/Loader';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ClientsSection from '../components/ClientsSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactSection from '../components/ContactSection';
import ActivitiesSection from '../components/ActivitiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [activitiesInView, setActivitiesInView] = useState(false);
  const { hasSeenLoader, setHasSeenLoader } = useContext(LoaderContext);

  // Handle loader completion
  const handleLoaderComplete = () => {
    setIsLoading(false);
  };
  
  // Scroll to activities section if returning from event details
  useEffect(() => {
    if (!isLoading && location.hash === '#activities') {
      const activitiesSection = document.getElementById('activities');
      if (activitiesSection) {
        setTimeout(() => {
          activitiesSection.scrollIntoView({ behavior: 'smooth' });
          setActivitiesInView(true);
        }, 100);
      }
    }
  }, [location, isLoading]);
  
  // Skip loader if user has already seen it
  useEffect(() => {
    if (hasSeenLoader) {
      setIsLoading(false);
    }
  }, [hasSeenLoader]);

  // Render loader if still loading and hasn't been seen before
  if (isLoading && !hasSeenLoader) {
    return <Loader onComplete={() => {
      handleLoaderComplete();
      setHasSeenLoader(true);
    }} />;
  }

  return (
    <div className="min-h-screen">
      <motion.div 
        key="index-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header />
        <HeroSection />
        <ServicesSection />
        <ClientsSection />
        <AchievementsSection />
        <TestimonialsSection />
        <motion.div
          initial={activitiesInView ? { scale: 0.95, opacity: 0.8 } : false}
          animate={activitiesInView ? { scale: 1, opacity: 1 } : false}
          transition={{ duration: 0.5 }}
        >
          <ActivitiesSection />
        </motion.div>
        <ContactSection />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;