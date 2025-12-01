import React, { useEffect, useRef } from 'react';
// Fixing imports by using CDN links since local node_modules are not available
import gsap from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandParallax() {
  const containerRef = useRef(null);
  const maskLayerRef = useRef(null);
  const dotsRef = useRef([]);

  // Generate random data for dots with Colors (Blue, Orange, Mix)
  const dotsData = useRef([...Array(100)].map(() => {
    const colorRoll = Math.random();
    let colorClass = '';
    
    // 40% Blue, 40% Orange, 20% Gradient Mix
    if (colorRoll < 0.4) {
      colorClass = 'bg-[#0078f0]';
    } else if (colorRoll < 0.8) {
      colorClass = 'bg-[#ff9f20]';
    } else {
      colorClass = 'bg-gradient-to-br from-[#0078f0] to-[#ff9f20]';
    }

    return {
      size: Math.random() * 4 + 2, // 2px to 6px
      x: Math.random() * 100,
      y: Math.random() * 100,
      alpha: Math.random() * 0.6 + 0.3, // Opacity
      duration: Math.random() * 15 + 10, // Float duration (Slower is better)
      depth: Math.random() * 0.5 + 0.1, // For parallax effect
      colorClass: colorClass
    };
  }));

  // Responsive Positions
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
    const ring = maskLayer.querySelector('.tech-ring');

    // --- 1. MASK REVEAL ANIMATION (SCROLL) ---
    gsap.set(maskLayer, { '--mask-radius': '12vh' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
      }
    });

    // Expand Mask
    tl.to(maskLayer, { 
      '--mask-radius': '150vmax', 
      duration: 10, 
      ease: 'power1.inOut' 
    }, 0);

    // Rotate Ring
    tl.to(ring, {
      scale: 15,
      opacity: 0,
      rotation: 180,
      duration: 8,
      ease: 'power1.in'
    }, 0);

    // Text Animations
    texts.forEach((text, i) => {
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

    // Cleanup Mask
    tl.to(maskLayer, { opacity: 0, duration: 0.5 }, 9.5);


    // --- 2. GALAXY MOTION (Ambient + Mouse) ---
    const ctx = gsap.context(() => {
        
        dotsRef.current.forEach((dot, i) => {
            if(!dot) return;
            const data = dotsData.current[i];

            // A. AMBIENT FLOATING (Always running)
            // Using xPercent/yPercent so it doesn't conflict with x/y mouse movement
            gsap.to(dot, {
                xPercent: "random(-1000, 1000)", // Large range relative to dot size
                yPercent: "random(-1000, 1000)", 
                rotation: "random(-360, 360)",
                duration: data.duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Random pulsing opacity
            gsap.to(dot, {
                opacity: 0.2,
                duration: Math.random() * 2 + 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });
        });
    });

    // B. MOUSE INTERACTION (Parallax)
    const handleMouse = (e) => {
      const { clientX, clientY } = e;
      const xCenter = window.innerWidth / 2;
      const yCenter = window.innerHeight / 2;
      
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const depth = dotsData.current[i].depth;
        
        // Move opposite to mouse
        let moveX = (clientX - xCenter) * depth * -0.4;
        let moveY = (clientY - yCenter) * depth * -0.4;

        // Use 'x' and 'y' (pixels) for mouse, separate from ambient 'xPercent'
        gsap.to(dot, {
          x: moveX,
          y: moveY,
          duration: 1.2,
          ease: "power2.out",
          overwrite: false // Important: Don't kill the ambient motion
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
        </div>

        {/* MASK LAYER (Black Overlay + Galaxy) */}
        <div
          ref={maskLayerRef}
          className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
          style={{
            background: '#000000',
            maskImage: 'radial-gradient(circle at center, transparent var(--mask-radius), black calc(var(--mask-radius) + 60px))',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent var(--mask-radius), black calc(var(--mask-radius) + 60px))',
          }}
        >
          {/* Inner Solid Border */}
          <div 
            className="absolute border border-[#0078f0]/40 rounded-full"
            style={{
              width: 'calc(var(--mask-radius) * 2 + 10px)',
              height: 'calc(var(--mask-radius) * 2 + 10px)',
              transition: 'width 0.1s, height 0.1s'
            }} 
          />

          {/* Outer Creative Tech Ring */}
          <div 
            className="tech-ring absolute rounded-full border border-dashed border-[#0078f0]/60"
            style={{
              width: 'calc(var(--mask-radius) * 2 + 60px)',
              height: 'calc(var(--mask-radius) * 2 + 60px)',
              transition: 'width 0.1s, height 0.1s',
              animation: 'spin 20s linear infinite'
            }} 
          />

          {/* Galaxy Dots */}
          {dotsData.current.map((data, i) => (
            <div
              key={i}
              ref={el => dotsRef.current[i] = el}
              className={`absolute rounded-full ${data.colorClass}`}
              style={{
                width: data.size + 'px',
                height: data.size + 'px',
                left: data.x + '%',
                top: data.y + '%',
                opacity: data.alpha,
                boxShadow: `0 0 12px ${data.colorClass.includes('orange') ? '#ff9f20' : '#0078f0'}`,
                willChange: 'transform' // Performance optimization
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

      {/* Global Style for Spin Animation */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}