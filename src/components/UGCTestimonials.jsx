import React, { useEffect, useRef } from "react";
// Using CDN imports
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UGCTestimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  // Duplicate list for infinite loop illusion if needed, keeping it simple for now
  const testimonials = [
    { id: 1, video: "/videos/Video-793.mp4", name: "Rohan Sharma", company: "Starlight Solar" },
    { id: 2, video: "/videos/Video-793.mp4", name: "Vikram Singh", company: "MixNuts Premium" },
    { id: 3, video: "/videos/Video-793.mp4", name: "Ankit Patel", company: "Real Estate Pro" },
    { id: 4, video: "/videos/Video-793.mp4", name: "Mayank Jain", company: "TechVision" },
    { id: 5, video: "/videos/Video-793.mp4", name: "Suresh Kumar", company: "Luxury Brand" },
    { id: 6, video: "/videos/Video-793.mp4", name: "Deepak Mehta", company: "E-Commerce Giant" },
    { id: 7, video: "/videos/Video-793.mp4", name: "Rajesh Verma", company: "Digital Empire" },
    { id: 8, video: "/videos/Video-793.mp4", name: "Priya Mehta", company: "Fashion Hub" },
  ];

  useEffect(() => {
    // Force refresh to fix any layout shift issues
    setTimeout(() => ScrollTrigger.refresh(), 500);

    const ctx = gsap.context(() => {
      
      // 1. Header Entrance
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { 
            trigger: titleRef.current, 
            start: "top 90%" // Triggers earlier to prevent blank space
          }
        }
      );

      // 2. Horizontal Scroll Container Entrance
      gsap.fromTo(scrollContainerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 85%"
          }
        }
      );

      // 3. Hover Effects (Managed via GSAP for smoothness)
      cardsRef.current.forEach((card) => {
        if(!card) return;
        
        card.addEventListener("mouseenter", () => {
           gsap.to(card, { y: -15, scale: 1.02, duration: 0.4, ease: "power2.out" });
           gsap.to(card.querySelector('.glow-border'), { opacity: 1, duration: 0.4 });
           gsap.to(card.querySelector('.video-overlay'), { opacity: 0.2, duration: 0.4 }); // Brighten video
        });

        card.addEventListener("mouseleave", () => {
           gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
           gsap.to(card.querySelector('.glow-border'), { opacity: 0, duration: 0.4 });
           gsap.to(card.querySelector('.video-overlay'), { opacity: 0.6, duration: 0.4 }); // Darken video back
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white overflow-hidden py-32 font-sans selection:bg-blue-500/30"
    >
      
      {/* --- BACKGROUND AMBIENCE (Matching Theme) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
         
         {/* Grid */}
         <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem]" />
         </div>

         {/* Ambient Glows */}
         <div className="absolute top-1/3 left-[-10%] w-[40vw] h-[40vw] bg-[#0078f0]/15 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-0 right-[-10%] w-[40vw] h-[40vw] bg-[#ff9f20]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div ref={titleRef} className="text-center mb-20 will-change-transform">
          <div className="flex items-center justify-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mb-6">
             <div className="w-12 h-[1px] bg-gray-700" />
             <span>Success Stories</span>
             <div className="w-12 h-[1px] bg-gray-700" />
          </div>

          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-white mix-blend-exclusion">
             REAL<br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">RESULTS.</span>
          </h2>
        </div>

        {/* --- HORIZONTAL SCROLL TRACK --- */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide px-4 md:px-10 pb-12 will-change-transform"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative flex-shrink-0 w-[85vw] md:w-[400px] cursor-pointer"
            >
              
              {/* --- CARD CONTAINER --- */}
              {/* Added a subtle border and background to prevent 'black hole' effect before video loads */}
              <div className="relative h-[60vh] md:h-[600px] bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 transition-transform duration-500">
                
                {/* 1. GLOW BORDER (Hidden by default, shows on hover) */}
                <div className="glow-border absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 pointer-events-none z-20"
                     style={{ 
                       boxShadow: 'inset 0 0 40px rgba(0,120,240,0.3)',
                       border: '2px solid rgba(255,159,32,0.5)' 
                     }} 
                />

                {/* 2. VIDEO LAYER */}
                <video
                  src={t.video}
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  loop
                  muted
                  playsInline
                  autoPlay
                />

                {/* 3. GRADIENT OVERLAY (Always visible for text readability) */}
                <div className="video-overlay absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity duration-500 z-10" />

                {/* 4. CONTENT */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                           <path d="M8 5v14l11-7z" />
                        </svg>
                     </div>
                     <span className="text-xs font-bold uppercase tracking-widest text-[#0078f0]">Play Story</span>
                  </div>

                  <h3 className="text-3xl font-bold text-white leading-tight mb-1">
                    {t.name}
                  </h3>
                  <p className="text-sm font-mono text-[#ff9f20] tracking-wider">
                    {t.company}
                  </p>
                </div>

              </div>

              {/* Reflection/Shadow underneath */}
              <div className="absolute -bottom-4 left-4 right-4 h-4 bg-[#0078f0]/20 blur-xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

            </div>
          ))}
          
          {/* Spacer for right padding */}
          <div className="w-10 flex-shrink-0" />
        </div>

        {/* --- STATS FOOTER --- */}
        <div className="text-center mt-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-50">
           <div className="text-center">
              <div className="text-3xl font-black text-white">500+</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">Happy Clients</div>
           </div>
           <div className="hidden md:block w-[1px] h-8 bg-gray-700" />
           <div className="text-center">
              <div className="text-3xl font-black text-white">10+</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">Countries Served</div>
           </div>
        </div>

      </div>

      {/* Hide Scrollbar Utility */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default UGCTestimonials;