import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandParallax() {
  const containerRef = useRef(null);
  const maskLayerRef = useRef(null);
  const dotsRef = useRef([]);

  // Dots data (Reduced count slightly for better mobile performance)
  const dotsData = useRef([...Array(40)].map(() => ({
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    alpha: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 20 + 10,
    depth: Math.random() * 0.5 + 0.1,
  })));

  // Responsive Positions: 
  // Mobile: Text centered vertically/horizontally to stay safe.
  // Desktop (md): Original creative positions.
  const infoPoints = [
    { 
      id: 1, title: "Strategy", desc: "Data-driven insights.", 
      pos: "top-[15%] left-1/2 -translate-x-1/2 md:translate-x-0 md:top-[32%] md:left-[28%]", 
      align: "text-center md:text-right" 
    },
    { 
      id: 2, title: "Design", desc: "Crafting visual identities.", 
      pos: "top-[28%] left-1/2 -translate-x-1/2 md:translate-x-0 md:top-[40%] md:right-[26%]", 
      align: "text-center md:text-left" 
    },
    { 
      id: 3, title: "Development", desc: "Robust & scalable tech.", 
      pos: "bottom-[28%] left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-[35%] md:left-[25%]", 
      align: "text-center md:text-right" 
    },
    { 
      id: 4, title: "Marketing", desc: "Stories that convert.", 
      pos: "bottom-[15%] left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-[30%] md:right-[28%]", 
      align: "text-center md:text-left" 
    },
  ];

  useEffect(() => {
    const maskLayer = maskLayerRef.current;
    const texts = gsap.utils.toArray('.agency-text');
    const ring = maskLayer.querySelector('.tech-ring'); // Select the new ring

    gsap.set(maskLayer, { '--mask-radius': '12vh' }); // Start smaller

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%', // Reduced from 250% to 150% (Faster scroll)
        pin: true,
        scrub: 1, // Tighter scrub for instant feel
        onLeave: () => console.log("Scroll Finished - Next Section"), // Debug
      }
    });

    // 1. Expand Mask (Hole gets bigger)
    tl.to(maskLayer, { 
      '--mask-radius': '150vmax', 
      duration: 10, 
      ease: 'power1.inOut' 
    }, 0);

    // 2. Rotate & Expand the Tech Ring with the hole
    tl.to(ring, {
      scale: 15,
      opacity: 0,
      rotation: 180,
      duration: 8,
      ease: 'power1.in'
    }, 0);

    // 3. Text Animations (Synced tightly)
    texts.forEach((text, i) => {
      // Logic: Show text when mask is near it area
      const startTime = i * 2; 
      
      tl.fromTo(text, 
        { opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'back.out(1.7)' }, 
        startTime
      )
      .to(text, 
        { opacity: 0, scale: 1.1, filter: 'blur(10px)', duration: 1 }, 
        startTime + 2.5
      );
    });

    // 4. Final Cleanup: Ensure mask is gone EXACTLY when scroll ends
    tl.to(maskLayer, { opacity: 0, duration: 0.5 }, 9.5); 


    // --- Galaxy & Mouse Logic (Same as before, optimized) ---
    const ctx = gsap.context(() => {
        // Floating dots
        dotsRef.current.forEach((dot, i) => {
            if(!dot) return;
            gsap.to(dot, {
                x: `+=${Math.random() * 80 - 40}`,
                y: `+=${Math.random() * 80 - 40}`,
                rotation: Math.random() * 360,
                duration: dotsData.current[i].duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    });

    const handleMouse = (e) => {
      const { clientX, clientY } = e;
      const xCenter = window.innerWidth / 2;
      const yCenter = window.innerHeight / 2;
      
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const depth = dotsData.current[i].depth;
        
        // Simpler calculation for performance
        let moveX = (clientX - xCenter) * depth * -0.3;
        let moveY = (clientY - yCenter) * depth * -0.3;

        gsap.to(dot, {
          x: moveX,
          y: moveY,
          duration: 1,
          overwrite: "auto"
        });
      });
    };

    window.addEventListener("mousemove", handleMouse);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouse);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Container setup */}
      <div className="bg-[#050505] text-white">
        
        {/* PARALLAX SECTION */}
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden">

          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay loop muted playsInline
              className="w-full h-full object-cover opacity-70"
            >
              <source src="https://www.pexels.com/download/video/4919748/" type="video/mp4" />
            </video>
            {/* <div className="absolute inset-0 bg-black/60" /> */}
          </div>

          {/* MASK LAYER (Black Overlay + Hole + Galaxy) */}
          <div
            ref={maskLayerRef}
            className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
            style={{
              background: '#000000',
              maskImage: 'radial-gradient(circle at center, transparent var(--mask-radius), black calc(var(--mask-radius) + 60px))',
              WebkitMaskImage: 'radial-gradient(circle at center, transparent var(--mask-radius), black calc(var(--mask-radius) + 60px))',
            }}
          >
            {/* 1. SOLID BORDER (Inner) */}
            <div 
              className="absolute border border-[#0078f0]/40 rounded-full"
              style={{
                width: 'calc(var(--mask-radius) * 2 + 10px)',
                height: 'calc(var(--mask-radius) * 2 + 10px)',
                transition: 'width 0.1s, height 0.1s'
              }} 
            />

            {/* 2. CREATIVE TECH RING (Outer, Dashed, Rotating) */}
            <div 
              className="tech-ring absolute rounded-full border border-dashed border-[#0078f0]/60"
              style={{
                width: 'calc(var(--mask-radius) * 2 + 60px)',
                height: 'calc(var(--mask-radius) * 2 + 60px)',
                transition: 'width 0.1s, height 0.1s',
                animation: 'spin 20s linear infinite' // CSS Spin
              }} 
            />

            {/* Galaxy Dots */}
            {dotsData.current.map((data, i) => (
              <div
                key={i}
                ref={el => dotsRef.current[i] = el}
                className="absolute rounded-full bg-white"
                style={{
                  width: data.size + 'px',
                  height: data.size + 'px',
                  left: data.x + '%',
                  top: data.y + '%',
                  opacity: data.alpha,
                  backgroundColor: i % 2 === 0 ? '#0078f0' : '#ffffff',
                  boxShadow: '0 0 10px rgba(0, 120, 240, 0.5)'
                }}
              />
            ))}
          </div>

          {/* TEXT LAYER */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {infoPoints.map((item) => (
              <div 
                key={item.id} 
                className={`agency-text absolute ${item.pos} ${item.align} w-full max-w-[90vw] md:w-auto md:max-w-md px-4`}
              >
                {/* Responsive Font Sizes: text-3xl for mobile, text-5xl for desktop */}
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter mix-blend-difference">
                  {item.title}
                  <span className="text-[#0078f0] inline-block scale-150 leading-none">.</span>
                </h3>
                
                <div className={`flex items-center gap-3 justify-center ${item.align.includes('right') ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  <div className="hidden md:block h-[1px] w-12 bg-[#0078f0]/50" />
                  <p className="text-xs md:text-sm font-light text-gray-300 uppercase tracking-[0.2em]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      

      </div>

      {/* Global Style for Spin Animation */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}