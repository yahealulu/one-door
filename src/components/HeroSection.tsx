import { useIsMobile } from '../hooks/use-mobile';

const HeroSection = () => {
  const isMobile = useIsMobile();
  return (
    <section id="hero" className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {isMobile ? (
        // Mobile: Advanced creative design instead of video
        <>
          {/* Dynamic Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-glow/80 to-accent/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          
          {/* Animated Geometric Patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rotate-45 animate-float"></div>
            <div className="absolute top-1/3 right-8 w-24 h-24 border border-primary-glow/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/3 left-6 w-20 h-20 bg-white/10 rotate-12 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-2/3 right-12 w-16 h-16 border-2 border-accent/40 animate-float" style={{ animationDelay: '3s' }}></div>
          </div>
          
          {/* Particle Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-accent/80 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/6 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          {/* Mobile Hero Content */}
          <div className="relative z-10 pb-16 flex flex-col items-center justify-center min-h-screen space-y-8 px-6">
            <div className="text-center space-y-6">
              {/* Logo Text with Advanced Effects */}
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-white tracking-wider animate-fade-in-up" style={{ 
                  textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px hsl(var(--primary))',
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))'
                }}>
                  one door
                </h1>
                
                {/* Interactive Divider */}
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-white/80 animate-expand-width"></div>
                  <div className="w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
                  <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-white/80 animate-expand-width"></div>
                </div>
              </div>
              
              <p className="text-2xl text-white/90 font-light tracking-wide animate-fade-in" style={{ 
                animationDelay: '0.5s',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}>
                open the future
              </p>
            </div>
            
            {/* Advanced Scroll Indicator */}
            <div className="flex flex-col items-center space-y-6 mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
              <p className="text-white/80 text-lg font-light tracking-[0.2em] uppercase animate-pulse">
                Scroll to explore
              </p>
              
              {/* Sophisticated Scroll Arrow */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full w-12 h-12 animate-ping"></div>
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/30 rounded-full w-12 h-12 flex items-center justify-center animate-bounce">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </div>
              </div>
              
              {/* Progress Dots */}
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Desktop: Original video background
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover md:object-cover object-center"
            style={{
              objectPosition: 'center center'
            }}
          >
            <source src="/assets/main.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-background/30" />

          <div className="relative z-10 pb-12 flex flex-col items-center space-y-4">
            <p className="text-foreground/80 text-lg font-light tracking-wide">
              Scroll to explore
            </p>
            
            <div className="animate-bounce">
              <svg 
                className="w-6 h-6 text-primary-glow" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;