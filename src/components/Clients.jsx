import React, { useRef, useEffect, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClientsCreative() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [logos, setLogos] = useState([]);

  // --- 1. SMART IMAGE LOADER ---
  useEffect(() => {
    const checkImages = async () => {
      const promises = [];
      // Checking 50 images (Adjust loop as needed)
      for (let i = 1; i <= 50; i++) {
        const src = `/images/clients/${i}.png`;
        const promise = new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve({ id: i, src, valid: true });
          img.onerror = () => resolve({ id: i, valid: false });
        });
        promises.push(promise);
      }
      const results = await Promise.all(promises);
      setLogos(results.filter(r => r.valid));
    };
    checkImages();
  }, []);

  // --- 2. GSAP ENTRANCE ANIMATION ---
  useEffect(() => {
    if (logos.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading Reveal
      gsap.fromTo(".anim-header", 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
        }
      );

      // Cards Pop-up (Elastic Effect)
      gsap.fromTo(".client-card",
        { opacity: 0, scale: 0.5, y: 50 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.8,
          stagger: { amount: 0.8, grid: "auto", from: "center" },
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: { trigger: containerRef.current, start: "top 60%" }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [logos]);

  // --- 3. 3D TILT EFFECT ON HOVER ---
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    const rotateX = (0.5 - yPct) * 20; // Max 20deg rotation
    const rotateY = (xPct - 0.5) * 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 20px 40px -10px rgba(0,120,240,0.3)" // Blue shadow glow
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
      boxShadow: "none"
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] py-28 px-6 md:px-12 overflow-hidden font-sans flex flex-col items-center"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900/30 via-[#050505] to-[#050505]" />

      <div className="relative z-10 w-full max-w-[1400px]">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20 space-y-4">
          <div className="anim-header inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
             Trusted Partners
          </div>
          <h2 className="anim-header text-4xl md:text-6xl font-bold text-white tracking-tight">
            Our Ecosystem
          </h2>
          <p className="anim-header text-gray-400 max-w-lg mx-auto text-lg">
            Collaborating with ambitious brands to define the digital frontier.
          </p>
        </div>

        {/* --- 3D FLOATING GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 perspective-1000">
          {logos.map((logo, i) => (
            <div
              key={logo.id}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="client-card group relative h-40 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-6 cursor-pointer transform-style-3d transition-colors hover:bg-white/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Inner Glow Gradient (Hidden until hover) */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />

              {/* LOGO (Actual Color) */}
              <img
                src={logo.src}
                alt={logo.name}
                className="relative z-10 w-full h-full object-contain 
                           transform transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
                style={{ transform: "translateZ(20px)" }} // Logo floats above card
              />
            </div>
          ))}

          {/* Fallback if no logos found (For demo purposes) */}
          {logos.length === 0 && (
             <div className="col-span-full text-center text-gray-500 py-10">
                Loading Partners...
             </div>
          )}
        </div>

      </div>
    </section>
  );
}