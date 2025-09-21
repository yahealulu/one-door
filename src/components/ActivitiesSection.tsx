import { useEffect, useRef } from 'react';
import { Calendar, MapPin, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { timelineData } from '../data/timelineData';



const ActivitiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const navigateToEvent = (eventId: string) => {
    console.log('Navigating to event:', eventId);
    navigate(`/event/${eventId}`);
  };

  return (
    <section ref={sectionRef} id="activities" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Our Activities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our journey through major exhibitions and strategic partnerships, 
            showcasing One Door's commitment to digital transformation and innovation.
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-7xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-glow to-primary-dark rounded-full"></div>

          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item reveal flex flex-col lg:flex-row items-start mb-12 lg:mb-20 ${
                item.isNested ? 'ml-8 lg:ml-16' : ''
              } ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Timeline Node */}
              <div className={`relative z-10 flex-shrink-0 mb-6 lg:mb-0 ${
                index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
              } ${item.isNested ? 'ml-4' : 'ml-4 lg:ml-0'}`}>
                <div className={`w-20 h-20 ${
                  item.type === 'exhibition' ? 'bg-primary' : 'bg-accent'
                } rounded-full flex items-center justify-center shadow-glow border-4 border-background hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                {/* Connection line for nested items */}
                {item.isNested && (
                  <div className="absolute -left-4 top-10 w-4 h-0.5 bg-border"></div>
                )}
              </div>

              {/* Content Card */}
              <div 
                className={`glass p-8 rounded-3xl flex-1 hover:shadow-elegant hover:scale-[1.02] transition-all duration-500 group max-w-4xl ${
                  index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                } cursor-pointer`}
                onClick={() => navigateToEvent(item.id)}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Text Content */}
                  <div className={`flex-1 min-w-0 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-2 mb-4 text-primary">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.date}</span>
                    </div>
                    
                    {item.location && (
                      <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    )}

                    <h3 className={`text-2xl lg:text-3xl font-bold mb-6 ${
                      item.type === 'exhibition' ? 'text-gradient' : 'text-foreground'
                    }`}>
                      {item.title}
                    </h3>

                    <div className="prose prose-invert max-w-none">
                      {item.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-muted-foreground leading-relaxed mb-4 last:mb-0 text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Image Gallery */}
                  <div className={`flex-shrink-0 w-full lg:w-80 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="grid grid-cols-2 gap-3">
                      {item.images.slice(0, 4).map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative group"
                        >
                          <img
                            src={image}
                            alt={`${item.title} - Image ${imgIndex + 1}`}
                            className="w-full h-24 lg:h-32 object-cover rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white" />
                          </div>
                          {/* Show count if more images */}
                          {imgIndex === 3 && item.images.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold text-lg">
                                +{item.images.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No longer need the EventDetailsView component as we're using page navigation */}
    </section>
  );
};

export default ActivitiesSection;