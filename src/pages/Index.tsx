import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LoaderContext } from '../App';
import Loader from '../components/Loader';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ClientsSection from '../components/ClientsSection';
import IndustriesSection from '../components/IndustriesSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactSection from '../components/ContactSection';
import ActivitiesSection from '../components/ActivitiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import AboutUsSection from '../components/AboutUsSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [activitiesInView, setActivitiesInView] = useState(false);
  const { hasSeenLoader, setHasSeenLoader } = useContext(LoaderContext);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  
  // Scroll to section based on hash
  useEffect(() => {
    if (!isLoading && location.hash) {
      const sectionId = location.hash.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen relative" ref={containerRef}>
      <motion.div 
        key="index-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header />
        <HeroSection />
        <AboutUsSection />
        <div className="relative z-20">
          <ServicesSection />
          <ClientsSection />
          <IndustriesSection />
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
        </div>
      </motion.div>
    </div>
  );
};

export default Index;