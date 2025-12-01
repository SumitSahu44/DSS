import React, { useEffect, useRef, useState } from 'react';
// Fixing imports by using CDN links since local node_modules are not available
import gsap from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Brand Strategy",
    desc: "We define the blueprint for your market dominance using data-driven insights.",
    theme: "from-gray-800 to-black",
    accent: "text-gray-400",
    border: "border-gray-600"
  },
  {
    id: "02",
    title: "UI/UX Design",
    desc: "Crafting intuitive, pixel-perfect digital experiences that users love.",
    theme: "from-blue-900 to-black",
    accent: "text-blue-400",
    border: "border-blue-500"
  },
  {
    id: "03",
    title: "Web Development",
    desc: "Building robust, scalable, and high-performance technical infrastructure.",
    theme: "from-emerald-900 to-black",
    accent: "text-emerald-400",
    border: "border-emerald-500"
  },
  {
    id: "04",
    title: "Motion & 3D",
    desc: "Immersive animations that bring your digital presence to life.",
    theme: "from-purple-900 to-black",
    accent: "text-purple-400",
    border: "border-purple-500"
  },
  {
    id: "05",
    title: "Mobile Apps",
    desc: "Native and cross-platform solutions for iOS and Android ecosystems.",
    theme: "from-orange-900 to-black",
    accent: "text-orange-400",
    border: "border-orange-500"
  },
  {
    id: "06",
    title: "Growth Marketing",
    desc: "Scaling your business through targeted organic and paid acquisition channels.",
    theme: "from-cyan-900 to-black",
    accent: "text-cyan-400",
    border: "border-cyan-500"
  }
];

export default function StackServices() {
  const containerRef = useRef(null);
  const stackWrapperRef = useRef(null); // Ref for 3D Tilt
  const cardsRef = useRef([]);
  const [activeCard, setActiveCard] = useState(1);

  // --- MOUSE TILT EFFECT ---
  const handleMouseMove = (e) => {
    if (!stackWrapperRef.current) return;
    
    const { innerWidth, innerHeight } = window;
    // Calculate mouse position relative to center (-1 to 1)
    const x = (e.clientX / innerWidth - 0.5) * 2; 
    const y = (e.clientY / innerHeight - 0.5) * 2; 

    // Apply smooth tilt
    gsap.to(stackWrapperRef.current, {
      rotationY: x * 8,  // Rotate left/right
      rotationX: -y * 8, // Rotate up/down
      ease: "power2.out",
      duration: 0.5,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  };

  const handleMouseLeave = () => {
    // Reset position when mouse leaves
    if (!stackWrapperRef.current) return;
    gsap.to(stackWrapperRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 1
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const totalCards = cards.length;

    let ctx = gsap.context(() => {
      
      // --- INITIAL STATE ---
      cards.forEach((card, i) => {
        gsap.set(card, { 
          zIndex: i, 
          scale: i === totalCards - 1 ? 1 : 0.9 + (i * 0.01), 
          y: i === totalCards - 1 ? 0 : 15 * (totalCards - 1 - i), 
          filter: i === totalCards - 1 ? 'brightness(1) blur(0px)' : 'brightness(0.4) blur(2px)', 
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=600%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(Math.floor(progress * totalCards), totalCards - 1);
            setActiveCard(index + 1);
          }
        }
      });

      // --- ANIMATION LOGIC (Fly Away) ---
      for (let i = totalCards - 1; i > 0; i--) {
        
        // 1. Current Top Card: Fly Away Upwards
        tl.to(cards[i], {
          y: -window.innerHeight * 1.2, 
          rotationX: -45,               
          z: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut"
        });

        // 2. The Card BELOW it: Come into Focus
        tl.to(cards[i - 1], {
          scale: 1,               
          y: 0,                   
          filter: 'brightness(1) blur(0px)', 
          duration: 0.8,
          ease: "power2.out"
        }, "<0.1"); 
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      
      {/* --- BACKGROUND (Mixed Gradient: Blue + Orange + Black) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Darkness */}
        <div className="absolute inset-0 bg-black" />

        {/* The Requested Colors - Mixed as Blurry Blobs */}
        {/* Blue (#0078f0) - Top Left/Center */}
        <div className="absolute top-[-10%] left-[-10%] md:left-[10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] bg-[#0078f0] rounded-full blur-[150px] opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Orange (#ff9f20) - Bottom Right/Center */}
        <div className="absolute bottom-[-10%] right-[-10%] md:right-[10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] bg-[#ff9f20] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Vignette to focus center */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* --- HEADER (Moved Up) --- */}
      <div className="absolute top-8 md:top-10 z-20 text-center w-full px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-3 drop-shadow-lg">
          Our Services
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#0078f0] to-transparent mx-auto rounded-full" />
        {/* <p className="text-gray-400 mt-3 text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
          Scroll to explore the stack
        </p> */}
      </div>

      {/* --- PROGRESS COUNTER --- */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4 items-center">
         <div className="text-white/20 text-sm font-mono rotate-90 origin-center translate-x-2">Step</div>
         <div className="w-[1px] h-12 bg-white/10" />
         <span className="text-2xl font-bold text-white tabular-nums">{`0${activeCard}`}</span>
         <div className="w-[1px] h-12 bg-white/10" />
         <span className="text-sm font-bold text-white/30">06</span>
      </div>

      {/* --- CARDS STACK CONTAINER (With Tilt Wrapper) --- */}
      {/* Added mt-12 to push stack down from header */}
      <div 
        ref={stackWrapperRef}
        className="relative z-10 mt-12 w-[85vw] h-[60vh] md:w-[420px] md:h-[580px]"
        style={{ perspective: '1200px' }} // Essential for 3D effect
      >
        
        {/* Inner container to hold cards */}
        <div className="relative w-full h-full transform-style-3d">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              // Card Styling
              className={`absolute inset-0 rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-br ${service.theme}`}
              style={{ 
                boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 25px 60px -15px rgba(0,0,0,0.6)',
                transformOrigin: 'center bottom',
                willChange: 'transform'
              }}
            >
              
              {/* 1. TOP SECTION: Number & Decoration */}
              <div className="flex justify-between items-start w-full relative z-10">
                <span className={`text-7xl md:text-8xl font-black opacity-20 tracking-tighter select-none ${service.accent}`}>
                  {service.id}
                </span>
                
                {/* Tech Pill Icon */}
                <div className={`px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] uppercase tracking-widest text-white/80`}>
                  Expertise
                </div>
              </div>

              {/* 2. BACKGROUND GLOW (Subtle) */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20 blur-[60px] ${service.accent.replace('text', 'bg')}`} />

              {/* 3. BOTTOM SECTION: Content */}
              <div className="relative z-10 mt-auto">
                
                {/* Animated Divider */}
                <div className={`w-12 h-1 mb-6 rounded-full ${service.accent.replace('text', 'bg')}`} />
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-[1.1]">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                  {service.desc}
                </p>

                {/* Action Link (Fake) */}
                <div className={`mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer group ${service.accent}`}>
                  <span>Learn More</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Glass Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-[2rem]" />
            </div>
          ))}
        </div>
        
      </div>

    </section>
  );
}