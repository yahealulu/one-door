import { useEffect, useRef } from 'react';
import nouraPortrait from '../assets/noura-portrait.jpg';
import ahmedPortrait from '../assets/ahmed-portrait.jpg';
import sarahPortrait from '../assets/sarah-portrait.jpg';
import abdulrahmanPortrait from '../assets/abdulrahman-portrait.jpg';

const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('active');
              }, index * 200);
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

  const clients = [
    {
      name: "Noura Al-Saeedi",
      role: "Digital Project Manager",
      image: nouraPortrait,
      testimonial: "One Door transformed our digital presence completely. Their expertise in project management made our vision a reality."
    },
    {
      name: "Ahmed Al-Muhandis",
      role: "Smart App Developer",
      image: ahmedPortrait,
      testimonial: "Working with One Door was seamless. They understood our technical requirements and delivered beyond expectations."
    },
    {
      name: "Sarah Al-Johari",
      role: "UX Designer",
      image: sarahPortrait,
      testimonial: "The collaboration was exceptional. One Door's attention to user experience details is remarkable."
    },
    {
      name: "Abdulrahman Ahmed",
      role: "Digital Marketing Manager",
      image: abdulrahmanPortrait,
      testimonial: "One Door's comprehensive approach to digital solutions helped us achieve our marketing goals effectively."
    }
  ];

  return (
    <section ref={sectionRef} id="clients" className="py-32 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-8 reveal">
            Our Clients
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto reveal">
            Trusted by professionals who value excellence and innovation
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="glass p-6 text-center hover:shadow-glow transition-all duration-500 hover:scale-105 reveal group"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors duration-300">
                <img 
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {client.name}
              </h4>
              <p className="text-primary font-medium mb-4">
                {client.role}
              </p>
              <p className="text-muted-foreground text-sm italic">
                "{client.testimonial}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;