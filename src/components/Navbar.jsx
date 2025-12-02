import React, { useState, useEffect, useRef } from "react";
import gsap from "https://esm.sh/gsap";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuOverlayRef = useRef(null);

  // --- STRICT SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Top 20px pe show, niche jate hi gayab
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- MOBILE MENU ANIMATION ---
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const overlay = menuOverlayRef.current;
    
    if (isMobileMenuOpen) {
      gsap.to(overlay, { autoAlpha: 1, duration: 0.3 });
      gsap.to(menu, { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" });
      gsap.fromTo(".mobile-link", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.1 }
      );
    } else {
      gsap.to(menu, { y: -20, opacity: 0, duration: 0.3, ease: "power3.in" });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.3 });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* --- FLOATING NAVBAR --- */}
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] 
          ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"}
          w-[90%] md:w-auto md:min-w-[600px] max-w-6xl rounded-full`}
      >
        {/* Glass Effect */}
        <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60" />
        </div>

        <div className="relative px-6 py-3 md:py-2 flex items-center justify-between">
          
          {/* --- LOGO IMAGE --- */}
          <a href="#" className="flex items-center z-20">
             {/* Yahan apna logo path lagayein */}
             <img 
               src="/images/logo.png" 
               alt="Brand Logo" 
               className="h-12 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
             />
          </a>

          {/* --- DESKTOP LINKS --- */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5 border border-white/5 ml-4">
            {['Work', 'Services', 'About', 'Insights'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="px-5 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* --- CTA & MOBILE TOGGLE --- */}
          <div className="flex items-center gap-3 z-20">
            <a 
              href="#contact" 
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#0078f0] hover:text-white transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)]"
            >
              Let's Talk
            </a>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 group bg-white/10 rounded-full border border-white/5"
            >
              <span className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden opacity-0 invisible"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        ref={mobileMenuRef}
        className="fixed top-24 left-4 right-4 z-40 md:hidden bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 opacity-0 -translate-y-4 shadow-2xl origin-top"
      >
         <nav className="flex flex-col items-center gap-4">
            {['Work', 'Services', 'About', 'Insights'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="mobile-link text-lg font-medium text-gray-400 hover:text-white w-full text-center py-2 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              className="mobile-link mt-2 w-full py-3 bg-[#0078f0] text-white font-bold text-center rounded-xl uppercase text-xs tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Project
            </a>
         </nav>
      </div>
    </>
  );
}