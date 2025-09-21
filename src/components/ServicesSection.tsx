import { useEffect, useRef } from 'react';
import { Globe, Smartphone, Settings, Cloud, ShieldCheck, Palette, Brain } from 'lucide-react';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger curtain reveal
            const curtain = entry.target.querySelector('.curtain-reveal');
            if (curtain) {
              curtain.classList.add('active');
            }
            
            // Animate other elements
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('active');
              }, index * 200 + 500); // Delay after curtain animation
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      icon: <Globe className="text-primary" strokeWidth={1.5} size={36} />
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: <Smartphone className="text-primary" strokeWidth={1.5} size={36} />
    },
    {
      title: "Backend Systems",
      description: "Scalable server-side solutions and API development",
      icon: <Settings className="text-primary" strokeWidth={1.5} size={36} />
    },
    {
      title: "Cloud Solutions",
      description: "Cloud infrastructure and deployment strategies",
      icon: <Cloud className="text-primary" strokeWidth={1.5} size={36} />
    },
    {
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets",
      icon: <ShieldCheck className="text-primary" strokeWidth={1.5} size={36} />
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that enhance user experience",
      icon: <Palette className="text-primary" strokeWidth={1.5} size={36} />
    },
    {
      title: "AI Integration",
      description: "Intelligent solutions powered by artificial intelligence",
      icon: <Brain className="text-primary" strokeWidth={1.5} size={36} />
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="relative py-32 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      {/* Curtain Reveal Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background transform translate-y-full transition-transform duration-1000 ease-out curtain-reveal"></div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-6 reveal">
            Continuous Support &<br />
            Integrated Services
          </h2>
          <p className="text-xl text-muted-foreground mb-4 reveal">
            for Your Digital Success
          </p>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-12 reveal">
            What We Create — From concept to deployment, we deliver comprehensive digital solutions that drive your business forward.
          </p>
          <button className="btn-primary reveal">
            Get Started
          </button>
        </div>

        {/* Services Title */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4 reveal">
            Our Services
          </h3>
          <p className="text-lg text-muted-foreground reveal">
            What We Create<br />
            From concept to deployment, we deliver comprehensive digital solutions that drive your business forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass p-8 hover:shadow-glow transition-all duration-500 hover:scale-105 reveal group"
            >
              <div className="mb-4 group-hover:animate-bounce">
                {service.icon}
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h4>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;