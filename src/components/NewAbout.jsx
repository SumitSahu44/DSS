import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandParallax() {
  const containerRef = useRef(null);
  const maskLayerRef = useRef(null);
  
  // Data with aligned text
  const infoPoints = [
    { id: 1, title: "Strategy", desc: "Data-driven insights.", pos: "top-[32%] left-[28%]", align: "text-right" },
    { id: 2, title: "Design", desc: "Crafting visual identities.", pos: "top-[40%] right-[26%]", align: "text-left" },
    { id: 3, title: "Development", desc: "Robust & scalable tech.", pos: "bottom-[35%] left-[25%]", align: "text-right" },
    { id: 4, title: "Marketing", desc: "Stories that convert.", pos: "bottom-[30%] right-[28%]", align: "text-left" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const maskLayer = maskLayerRef.current;
    const texts = gsap.utils.toArray('.agency-text');

    // Initial Circle Size
    gsap.set(maskLayer, { '--mask-radius': '18vh' }); 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=300%', // Smooth fast scroll
        pin: true,
        scrub: 1, 
      }
    });

    // 1. Mask Expansion
    tl.to(maskLayer, {
      '--mask-radius': '150vmax', 
      duration: 5,                
      ease: 'power1.inOut'
    }, 0);

    // 2. Text Sequence
    texts.forEach((text, i) => {
      const startTime = i * 1.1; 
      const stayTime = 0.6;      

      tl.fromTo(text, 
        { opacity: 0, scale: 0.9, x: i % 2 === 0 ? -20 : 20 }, // Slide in slightly
        { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        startTime
      )
      .to(text, 
        { opacity: 0, scale: 1.1, duration: 0.4, ease: 'power2.in' },
        startTime + stayTime
      );
    });

    // 3. Cleanup
    tl.to(maskLayer, { opacity: 0, duration: 0.5 }, 4.5);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#050505] text-white">

      {/* Hero Section */}
      {/* <div className="h-screen flex flex-col items-center justify-center relative z-20 overflow-hidden"> */}
        {/* Abstract Background Glows */}
        {/* <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0078f0] opacity-20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff9f20] opacity-10 blur-[120px] rounded-full" />

        <h1 className="text-7xl md:text-8xl font-light tracking-tighter relative z-10">
          Mix<span className="text-[#ff9f20] font-bold">Nuts</span>
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-[#ff9f20] to-[#0078f0] mt-4 rounded-full" />
        <p className="text-[#0078f0] mt-4 text-sm font-semibold tracking-[0.3em] uppercase opacity-80">
          Creative Agency
        </p>
        
        <div className="absolute bottom-10 animate-bounce text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div> */}

      {/* --- PARALLAX SECTION --- */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
        
        {/* Layer 1: Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            style={{ filter: 'saturate(1.2)' }} // Colors ko pop karne ke liye
          >
             {/* Agency Tech Vibe Video */}
            <source src="https://www.pexels.com/download/video/4919748/" type="video/mp4" />
          </video>
          {/* Blue Tint Overlay on Video */}
          <div className="absolute inset-0 bg-[#0078f0]/10 mix-blend-overlay" />
        </div>

        {/* Layer 2: Mask (Dark Background) */}
        <div
          ref={maskLayerRef}
          className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
          style={{
            // Deep Dark Blue/Black gradient background
            background: 'radial-gradient(circle at center, #0a0f1d 0%, #000000 100%)',
            
            maskImage: 'radial-gradient(circle at center, transparent var(--mask-radius), black calc(var(--mask-radius) + 1px))',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent var(--mask-radius), black calc(var(--mask-radius) + 1px))',
          }}
        >
           {/* Branding Ring around hole - Using your Orange #ff9f20 */}
           <div className="absolute border border-[#ff9f20]/40 rounded-full box-border" 
                style={{
                  width: 'calc(var(--mask-radius) * 2 + 20px)',
                  height: 'calc(var(--mask-radius) * 2 + 20px)',
                  boxShadow: '0 0 30px rgba(255, 159, 32, 0.1)', // Subtle Orange Glow
                  transition: 'all 0.1s linear'
                }} 
           />
        </div>

        {/* Layer 3: Info Text */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {infoPoints.map((item) => (
            <div 
              key={item.id} 
              className={`agency-text absolute ${item.pos} ${item.align} w-72`}
            >
              <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                {item.title}
                {/* Dot in Orange */}
                <span className="text-[#ff9f20] text-5xl leading-none">.</span>
              </h3>
              {/* Divider Line in Gradient */}
              <div className={`h-[1px] w-16 bg-gradient-to-r from-[#ff9f20] to-transparent mb-2 ${item.align === 'text-right' ? 'ml-auto' : ''}`} />
              
              <p className="text-sm font-medium text-[#0078f0] uppercase tracking-widest">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Next Section (Seamless Transition) */}
      {/* <div className="min-h-screen bg-black flex items-center justify-center relative z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] to-black" />
        
        <div className="max-w-4xl text-center px-4 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9f20] to-[#0078f0]">Innovate</span>
          </h2>
          <button className="px-8 py-4 bg-[#ff9f20] text-black font-bold text-lg rounded-full hover:bg-[#0078f0] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,159,32,0.4)]">
            Start Project
          </button>
        </div>
      </div> */}

    </div>
  );
}