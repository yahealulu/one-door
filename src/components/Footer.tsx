import { useEffect, useRef } from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = footerRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we're not on the home page, navigate to it first
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer ref={footerRef} className="bg-secondary/30 border-t border-border/30">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 reveal">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/assets/logo.webp" 
                alt="One Door" 
                className="h-16 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  const heroSection = document.getElementById('hero');
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <a 
                href="https://www.facebook.com/profile.php?id=61572301930088" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/company/intishaar-software/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://www.instagram.com/onedoor_company?fbclid=IwY2xjawM478pleHRuA2FlbQIxMABicmlkETFGeFRRbzMxeDJCa21GZUduAR719a5P7_6N3-VyfMNuX7qE1CbLLCo1m3xNDAuDBNrMhOtA-1JDCKBRE1awMQ_aem_Uv3sP6Hv7gnkXC7OD4ctXw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
            </div>
            <div className="space-y-3 mb-8">
              <p className="text-foreground font-medium text-lg">
                Success stories begin with the right partner.
              </p>
              <p className="text-muted-foreground">
                Technology is closer and easier than you imagine.
              </p>
              <p className="text-muted-foreground">
                Together, we build digital success stories that inspire.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="reveal">
            <h4 className="text-lg font-semibold text-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', id: 'about-us' },
                { name: 'Services', id: 'services' },
                { name: 'Our Clients', id: 'clients' },
                { name: 'Contact Us', id: 'contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.id);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="reveal">
            <h4 className="text-lg font-semibold text-foreground mb-6">
              Legal & Contact
            </h4>
            <ul className="space-y-3 mb-6">
              {['Privacy Policy', 'Terms of Use'].map((link) => (
                <li key={link}>
                  <a 
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Locations */}
            <div className="space-y-2 mb-4">
              <p className="text-sm text-muted-foreground">
                Syria - Damascus - Kafr Souseh
              </p>
              <p className="text-sm text-muted-foreground">
                Syria - Aleppo - Opposite Sheraton Hotel
              </p>
            </div>

            {/* Phone Numbers */}
            <div className="space-y-1">
              {[
                '00963969697088',
                '00963930342875', 
                '00963990486277',
                '00963 995 550 310'
              ].map((phone) => (
                <p key={phone} className="text-sm text-muted-foreground">
                  {phone}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 mt-12 pt-8 text-center reveal">
          <p className="text-muted-foreground">
            © 2025 One Door. All rights reserved. Building digital success stories.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;