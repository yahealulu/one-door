import { useState, useEffect, useRef } from 'react';

const IndustriesSection = () => {
  const [displayedIndustries, setDisplayedIndustries] = useState<{name: string, color: string}[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(true);
  const [terminalSize, setTerminalSize] = useState(1);
  const [isInViewport, setIsInViewport] = useState(false);
  const [commandStage, setCommandStage] = useState(0); // 0: list, 1: details, 2: capabilities
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [capabilitiesVisible, setCapabilitiesVisible] = useState(false);
  const [detailsProgress, setDetailsProgress] = useState(0);
  const [capabilitiesProgress, setCapabilitiesProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Added state for mobile detection
  const terminalRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const industries = [
    { name: "E-payments & Banking", color: "text-green-400" },
    { name: "Healthcare", color: "text-blue-400" },
    { name: "E-commerce", color: "text-yellow-400" },
    { name: "Telecom", color: "text-purple-400" }
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll for terminal resizing (desktop only)
  useEffect(() => {
    if (isMobile) {
      setTerminalSize(2); // Always expanded on mobile
      return;
    }

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const inViewport = rect.top < windowHeight && rect.bottom > 0;
        setIsInViewport(inViewport);
        
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const sectionHeight = sectionRef.current.offsetHeight;
        const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / sectionHeight));
        
        setTerminalSize(1 + visibilityRatio);
      }
    };

    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [isMobile]);

  // Handle viewport detection for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const inViewport = rect.top < windowHeight && rect.bottom > 0;
        setIsInViewport(inViewport);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Animate details progress
  useEffect(() => {
    if (!detailsVisible) return;
    
    const interval = setInterval(() => {
      setDetailsProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [detailsVisible]);

  // Animate capabilities progress
  useEffect(() => {
    if (!capabilitiesVisible) return;
    
    const interval = setInterval(() => {
      setCapabilitiesProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [capabilitiesVisible]);

  // Command execution animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isInViewport) return;
    
    if (commandStage === 0) {
      // Stage 1: industries --list (faster)
      if (isAdding) {
        if (currentIndustryIndex < industries.length) {
          timer = setTimeout(() => {
            setDisplayedIndustries(prev => [...prev, industries[currentIndustryIndex]]);
            setCurrentIndustryIndex(prev => prev + 1);
          }, 400); // Reduced from 800ms to 400ms
        } else {
          timer = setTimeout(() => setIsAdding(false), 1500); // Reduced from 3000ms to 1500ms
        }
      } else {
        if (displayedIndustries.length > 0) {
          timer = setTimeout(() => {
            setDisplayedIndustries(prev => prev.slice(0, -1));
          }, 150); // Reduced from 300ms to 150ms
        } else {
          timer = setTimeout(() => {
            setCommandStage(1);
            setCurrentIndustryIndex(0);
            setIsAdding(true);
          }, 500); // Reduced from 1000ms to 500ms
        }
      }
    } else if (commandStage === 1) {
      // Stage 2: industries --details (faster)
      timer = setTimeout(() => {
        setDetailsVisible(true);
        setDetailsProgress(0);
        setCommandStage(2);
      }, 800); // Reduced from 1500ms to 800ms
    } else if (commandStage === 2) {
      // Stage 3: industries --capabilities (faster)
      timer = setTimeout(() => {
        setCapabilitiesVisible(true);
        setCapabilitiesProgress(0);
        setCommandStage(3);
      }, 800); // Reduced from 1500ms to 800ms
    } else if (commandStage === 3) {
      // Reset animation after completion (faster)
      timer = setTimeout(() => {
        setCommandStage(0);
        setDetailsVisible(false);
        setCapabilitiesVisible(false);
        setDetailsProgress(0);
        setCapabilitiesProgress(0);
      }, 3000); // Reduced from 5000ms to 3000ms
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInViewport, isAdding, currentIndustryIndex, displayedIndustries.length, commandStage]);

  // Mobile-specific adjustments
  useEffect(() => {
    if (isMobile) {
      // Force terminal to expanded state on mobile
      setTerminalSize(2);
    }
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      id="industries" 
      className="py-16 md:py-32 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4 md:mb-8 reveal">
            Industries We Serve
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto reveal">
            Our expertise spans across multiple sectors, delivering tailored digital solutions
          </p>
        </div>

        {/* Terminal Container */}
        <div 
          className="mx-auto transition-all duration-300 ease-out"
          style={{
            maxWidth: `${Math.min(100, 50 + terminalSize * 25)}%`,
          }}
        >
          <div 
            className="glass transition-all duration-300 ease-out"
            style={{
              padding: `${terminalSize * 20}px`,
            }}
          >
            {/* Terminal Header */}
            <div className="flex items-center mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-center flex-grow text-muted-foreground text-sm">
                {/* Terminal title removed as requested */}
              </div>
            </div>

            {/* Terminal Content */}
            <div 
              ref={terminalRef}
              className="font-mono text-lg bg-black/30 rounded-lg border border-border/50 overflow-hidden transition-all duration-300"
              style={{
                minHeight: `${terminalSize * 200}px`,
                fontSize: `${Math.max(14, terminalSize * 16)}px`,
              }}
            >
              {/* Command Line - industries --list */}
              <div className="flex items-start p-4 border-b border-border/50">
                <span className="text-green-400 mr-2">{'>'}</span>
                <span className="mr-1">industries --list</span>
                <span className={`w-2 h-5 bg-white inline-block ml-1 ${showCursor && commandStage === 0 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></span>
              </div>

              {/* Industry List with Typing Effect */}
              <div className="p-4 overflow-y-auto">
                <div className="space-y-3">
                  {displayedIndustries.map((industry, index) => (
                    <div 
                      key={index}
                      className="flex items-center animate-fade-in text-sm md:text-base" // Added responsive text size
                    >
                      <span className="text-green-500 mr-2 text-sm md:text-base">[OK]</span> {/* Added responsive text size */}
                      <span className={`${industry.color} text-sm md:text-base`}>{industry.name}</span> {/* Added responsive text size */}
                    </div>
                  ))}
                </div>
                
                {/* Command Line - industries --details */}
                {detailsVisible && (
                  <div className="mt-6 flex items-start">
                    <span className="text-green-400 mr-2">{'>'}</span>
                    <span className="mr-1">industries --details</span>
                    <span className={`w-2 h-5 bg-white inline-block ml-1 ${showCursor && commandStage === 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></span>
                  </div>
                )}
                
                {/* Details Output with Progress Animation */}
                {detailsVisible && (
                  <div className="mt-4 space-y-2 text-muted-foreground text-sm">
                    <div className="flex items-center">
                      <span>Retrieving industry specifications...</span>
                      <div className="ml-2 w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-200 ease-out"
                          style={{ width: `${detailsProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    {detailsProgress >= 25 && (
                      <div className="pl-4 text-green-400 animate-fade-in">✓ E-payments & Banking: Digital payment solutions, mobile banking platforms</div>
                    )}
                    {detailsProgress >= 50 && (
                      <div className="pl-4 text-blue-400 animate-fade-in">✓ Healthcare: Telemedicine platforms, patient management systems</div>
                    )}
                    {detailsProgress >= 75 && (
                      <div className="pl-4 text-yellow-400 animate-fade-in">✓ E-commerce: Online marketplaces, payment integration</div>
                    )}
                    {detailsProgress >= 100 && (
                      <div className="pl-4 text-purple-400 animate-fade-in">✓ Telecom: Network management, customer portals</div>
                    )}
                  </div>
                )}
                
                {/* Command Line - industries --capabilities */}
                {capabilitiesVisible && (
                  <div className="mt-6 flex items-start">
                    <span className="text-green-400 mr-2">{'>'}</span>
                    <span className="mr-1">industries --capabilities</span>
                    <span className={`w-2 h-5 bg-white inline-block ml-1 ${showCursor && commandStage === 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></span>
                  </div>
                )}
                
                {/* Capabilities Output with Progress Animation */}
                {capabilitiesVisible && (
                  <div className="mt-4 space-y-2 text-muted-foreground text-sm">
                    <div className="flex items-center">
                      <span>Analyzing cross-industry expertise...</span>
                      <div className="ml-2 w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-200 ease-out"
                          style={{ width: `${capabilitiesProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    {capabilitiesProgress >= 25 && (
                      <div className="pl-4 text-green-400 animate-fade-in">✓ Security & Compliance</div>
                    )}
                    {capabilitiesProgress >= 50 && (
                      <div className="pl-4 text-blue-400 animate-fade-in">✓ Scalability & Performance</div>
                    )}
                    {capabilitiesProgress >= 75 && (
                      <div className="pl-4 text-yellow-400 animate-fade-in">✓ User Experience</div>
                    )}
                    {capabilitiesProgress >= 100 && (
                      <div className="pl-4 text-purple-400 animate-fade-in">✓ Innovation & Adaptability</div>
                    )}
                  </div>
                )}
                
                {/* Final command prompt  */}
                {commandStage === 3 && (
                  <div className="mt-6 flex items-center">
                    <span className="text-green-400 mr-2">{'>'}</span>
                    <span className="w-2 h-5 bg-white inline-block ml-1 animate-pulse"></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;