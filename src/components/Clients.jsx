import React, { useRef } from 'react';
import { gsap } from 'gsap';

// Real Brand Logos (Using placeholders for demo - Replace src with your logos)
const brands = [
  { id: 1, name: "Spotify", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" },
  { id: 2, name: "Slack", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1024px-Slack_icon_2019.svg.png" },
  { id: 3, name: "Airbnb", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png" },
  { id: 4, name: "Netflix", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png" },
  { id: 5, name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" },
  { id: 6, name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" },
  { id: 7, name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/1024px-Amazon_icon.svg.png" },
  { id: 8, name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/834px-Apple_logo_black.svg.png" },
];

export default function PremiumLogoGrid() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Updating CSS variables for efficient animation
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
    >
      
      {/* Background Decor - Subtle Premium Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0078f0]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ff9f20]/5 rounded-full blur-[120px]" />
        {/* Grid Lines Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
           <h2 className="text-[#ff9f20] font-bold tracking-[0.2em] text-sm uppercase mb-3">
             Our Ecosystem
           </h2>
           <h3 className="text-4xl md:text-5xl font-bold text-white">
             Trusted by Market Leaders
           </h3>
           <p className="text-gray-500 mt-4 max-w-xl mx-auto">
             We collaborate with brands that define the future.
           </p>
        </div>

        {/* --- PREMIUM GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand, i) => (
            <div
              key={brand.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative h-44 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-300"
            >
              
              {/* 1. The Dynamic Border Glow (Mouse controlled) */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(
                    400px circle at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 159, 32, 0.4), 
                    transparent 40%
                  )`
                }}
              />

              {/* 2. Inner Mask (Creates the border effect by covering the center) */}
              <div 
                className="absolute inset-[1px] bg-[#0a0a0a] rounded-xl z-10 flex items-center justify-center"
              >
                {/* 3. Subtle Inner Glow inside the card (Very faint) */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(
                      200px circle at var(--mouse-x) var(--mouse-y), 
                      rgba(0, 120, 240, 0.7), 
                      transparent 50%
                    )`
                  }}
                />

                {/* LOGO IMAGE */}
                <div className="relative z-20 flex flex-col items-center justify-center transition-transform duration-500 group-hover:-translate-y-1">
                  <img 
                    src={brand.src} 
                    alt={brand.name}
                    className="w-16 h-16 object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                    style={{
                      // Adds a subtle drop shadow when colored
                      filter: 'grayscale(100%) brightness(0.7)',
                    }}
                    // Inline style override for hover state effect
                    onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%) drop-shadow(0 0 15px rgba(255,159,32,0.3))'}
                    onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%) brightness(0.7)'}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            And 50+ other companies pushing boundaries.
          </p>
        </div>

      </div>
    </section>
  );
}