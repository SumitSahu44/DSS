import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const stats = statsRef.current;

      // 1. Initial State (GPU optimized)
      gsap.set(stats, {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        rotate: 0,
        xPercent: -50,
        yPercent: -50,
        position: "absolute",
        left: "50%",
        top: "50%",
        force3D: true
      });

      // 2. Animate with ScrollTrigger
      gsap.to(stats, {
        x: (i, target) => target.dataset.finalX,
        y: (i, target) => target.dataset.finalY,
        rotate: (i) => i % 2 === 0 ? gsap.utils.random(-10, -5) : gsap.utils.random(5, 10), 
        scale: 1,
        opacity: 1,
        duration: 1.4,
        stagger: 0.1,
        ease: "back.out(1.5)",
        force3D: true,
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Text Animation
      gsap.fromTo(".hero-title .line", 
        { y: 120, opacity: 0, rotateX: -20, transformOrigin: "0% 50% -50" }, 
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power4.out",
          force3D: true
        }
      );
      
      // Button Animation
      gsap.fromTo(".hero-cta", 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5, force3D: true }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "500+", label: "Happy Clients", x: -380, y: -180 },
    { number: "8+", label: "Years Exp.", x: 360, y: -160 },
    { number: "₹20Cr", label: "Revenue", x: -350, y: 200 },
    { number: "320+", label: "Projects", x: 380, y: 180 },
    { number: "10+", label: "Global", x: -480, y: 0 },
    { number: "4.9", label: "Rating", x: 480, y: 40 },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative  pt-28 md:pt-36 overflow-hidden flex flex-col items-center justify-start px-4 md:px-6 bg-[#020205]"
    >
      {/* --- BACKGROUND TEXTURES START --- */}
      
      {/* 1. Base Deep Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a192f] via-[#050505] to-black z-0 pointer-events-none" />
      
      {/* 2. Fine Grainy Noise Texture (Existing) */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none z-0 mix-blend-overlay contrast-150"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.6'/%3E%3C/svg%3E")`,
          transform: "translateZ(0)"
        }}
      />

      {/* --- NEW: Peeling/Cracked Grunge Texture --- */}
      {/* Yeh naya layer hai jo "fata hua" effect dega */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none z-0 mix-blend-color-dodge"
        style={{
          // Ek naya SVG filter jo high contrast turbulence use karta hai cracks banane ke liye
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grungeFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='3' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 -7' result='contrasted'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grungeFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px' // Pattern ko repeat karne ke liye
        }}
      />
      
      {/* 4. Blue/Violet Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-700/30 blur-[150px] rounded-full z-0 pointer-events-none will-change-transform mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-800/20 blur-[180px] rounded-full z-0 pointer-events-none will-change-transform mix-blend-screen" />

      {/* 5. Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      />
      {/* --- BACKGROUND TEXTURES END --- */}
      

      {/* --- HERO CONTENT --- */}
      <h1 className="hero-title text-center z-20 mb-12 mt-10 max-w-5xl">
        <div className="overflow-hidden mb-2">
            <div className="line text-4xl md:text-6xl lg:text-9xl font-bold tracking-tighter text-zinc-300 will-change-transform">
                We <span style={{color:"#0078f0"}}> Build </span> Digital 
            </div>
        </div>
        <div className="overflow-hidden">
            <div className="line text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase will-change-transform">
                <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent drop-shadow-2xl">
                    <span style={{color:"#ff9f20"}}>  Experiences </span>
                </span>
            </div>
        </div>
      </h1>

      <div className="hero-cta z-20 mb-20 relative">
        <button className="group relative px-8 py-3 bg-white text-black font-semibold text-base md:text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
          <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10 flex items-center gap-2">
            Start a Project
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </button>
      </div>

      {/* --- IMAGE & FLOATING STATS --- */}
      <div ref={imageContainerRef} className="relative w-full max-w-5xl mx-auto z-10 pb-32">
        
        {/* Main Image Container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50 backdrop-blur-sm group will-change-transform">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            
            <img
              src="/images/3d.png" 
              alt="Creative Team"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1024"
              height="600"
              className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[30%] hover:grayscale-0"
            />
        </div>

        {/* Floating Stats */}
        {stats.map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            data-final-x={stat.x}
            data-final-y={stat.y}
            className="hidden md:flex flex-col items-center justify-center
                       absolute z-[50] 
                       bg-black/40 backdrop-blur-xl hover:backdrop-blur-2xl
                       border border-white/10 hover:border-white/30
                       rounded-2xl p-4 min-w-[120px]
                       shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                       will-change-transform
                       transition-colors duration-300"
            style={{ left: "50%", top: "50%" }}
          >
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">
              {stat.number}
            </div>
            <div className="text-zinc-400 font-bold text-xs tracking-widest uppercase mt-1">
              {stat.label}
            </div>
          </div>
        ))}

        {/* Mobile Stats */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;