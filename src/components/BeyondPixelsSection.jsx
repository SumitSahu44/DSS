import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const BeyondPixelsSection = () => {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);
  const titleRef = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => {
    const blob = blobRef.current;

    // Mouse-follow liquid blob
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      gsap.to(blob, {
        xPercent: x - 50,
        yPercent: y - 50,
        duration: 2.5,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Title glitch + reveal
    gsap.fromTo(titleRef.current.children,
      { y: "100%", rotateX: -90, opacity: 0 },
      {
        y: "0%",
        rotateX: 0,
        opacity: 1,
        duration: 1.8,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Floating magnetic orbs
    orbsRef.current.forEach((orb, i) => {
      gsap.to(orb, {
        x: Math.sin(i) * 100,
        y: Math.cos(i) * 80,
        rotation: 360,
        duration: 20 + i * 4,
        repeat: -1,
        ease: "none"
      });

      orb.addEventListener("mouseenter", () => {
        gsap.to(orb, { scale: 1.6, duration: 0.6, ease: "elastic.out(1,0.4)" });
      });
      orb.addEventListener("mouseleave", () => {
        gsap.to(orb, { scale: 1, duration: 0.8 });
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-soft-light">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Liquid Moving Blob */}
      <div 
        ref={blobRef}
        className="absolute w-96 h-96 md:w-[600px] md:h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0078f0] via-purple-600 to-pink-600 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute inset-10 bg-gradient-to-tr from-cyan-400 to-[#0078f0] rounded-full blur-2xl opacity-40" />
      </div>

      {/* Floating 3D Orbs */}
      {[0,1,2,3,4].map((i) => (
        <div
          key={i}
          ref={el => orbsRef.current[i] = el}
          className="absolute w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#0078f0]/40 to-transparent backdrop-blur-xl border border-white/10"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 18}%`,
            boxShadow: "0 0 80px rgba(0, 120, 240, 0.6)"
          }}
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        </div>
      ))}

      {/* Main Text */}
      <div className="relative z-10 text-center px-6">
        <h1 ref={titleRef} className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
          <span className="inline-block overflow-hidden">
            <span className="inline-block bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              BEYOND
            </span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <span className="inline-block text-[#0078f0] [text-shadow:0_0_80px_#0078f0] drop-shadow-2xl">
              PIXELS
            </span>
          </span>
        </h1>

        <p className="mt-10 text-xl md:text-2xl text-zinc-500 font-light max-w-2xl mx-auto">
          We don’t just build websites.<br />
          <span className="text-[#0078f0] font-medium">We create digital universes.</span>
        </p>

        <div className="mt-16 flex gap-6 justify-center">
          <button className="px-10 py-5 bg-[#0078f0] text-black font-bold rounded-full hover:scale-110 hover:shadow-2xl hover:shadow-[#0078f0]/50 transition duration-500">
            Start a Project
          </button>
          <button className="px-10 py-5 border border-zinc-700 text-white font-medium rounded-full backdrop-blur-xl hover:border-[#0078f0] hover:text-[#0078f0] transition duration-500">
            View Case Studies
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-zinc-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zinc-500 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default BeyondPixelsSection;