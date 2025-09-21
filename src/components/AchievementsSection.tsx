import { useEffect, useRef, useState } from 'react';

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    projects: 0,
    downloads: 0
  });

  const achievements = [
    { key: 'years', value: 7, suffix: '+', label: 'Years of Experience' },
    { key: 'clients', value: 120, suffix: '+', label: 'Satisfied Clients' },
    { key: 'projects', value: 50, suffix: '+', label: 'Projects Delivered' },
    { key: 'downloads', value: 10, suffix: 'M+', label: 'Downloads' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start counter animations
            achievements.forEach((achievement, index) => {
              setTimeout(() => {
                animateCounter(achievement.key as keyof typeof counts, achievement.value);
              }, index * 200);
            });

            // Reveal elements
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('active');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = (key: keyof typeof counts, targetValue: number) => {
    let current = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCounts(prev => ({ ...prev, [key]: targetValue }));
        clearInterval(timer);
      } else {
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }
    }, 30);
  };

  return (
    <section ref={sectionRef} id="achievements" className="py-32 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-8 reveal">
            Our Proud Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto reveal">
            Numbers that speak to our commitment to excellence and innovation
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.key}
              className="glass p-8 text-center hover:shadow-glow transition-all duration-500 hover:scale-105 reveal group"
            >
              <div className="counter mb-4 group-hover:text-glow transition-all duration-300">
                {counts[achievement.key as keyof typeof counts]}{achievement.suffix}
              </div>
              <p className="text-lg text-muted-foreground font-medium">
                {achievement.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;