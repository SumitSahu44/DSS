import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const blobRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Liquid blob mouse follow
    const moveBlob = (e) => {
      const { clientX, clientY } = e;
      gsap.to(blobRef.current, {
        x: clientX - window.innerWidth / 2,
        y: clientY - window.innerHeight / 2,
        duration: 3,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', moveBlob);

    // Title animation
    gsap.fromTo(titleRef.current.children,
      { y: 200, rotateX: -80, opacity: 0 },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.8,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3
      }
    );

    // Subtitle
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.4, delay: 1.2, ease: "power3.out" }
    );

    // CTA buttons
    gsap.fromTo(ctaRef.current.children,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 1.6, ease: "back.out(1.4)" }
    );

    // Floating glow pulse
    gsap.to(glowRef.current, {
      scale: 1.3,
      opacity: 0.6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => window.removeEventListener('mousemove', moveBlob);
  }, []);

  return (
    <section className="relative pt-40 min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated Liquid Blob Background */}
      <div ref={blobRef} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900 h-[900px] md:w-[1200px] md:h-[1200px] rounded-full bg-gradient-to-br from-[#0078f0] via-purple-600 to-pink-600 blur-3xl opacity-60" />
      </div>

      {/* Pulsating Glow */}
      <div ref={glowRef} className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0078f0] rounded-full blur-3xl opacity-40 -z-20" />

      {/* Grain Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-soft-light -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Title - Split Lines */}
          <h1 ref={titleRef} className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter leading-none">
            <div className="overflow-hidden pb-4">
              <span className="inline-block bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                WE DON'T
              </span>
            </div>
            <div className="overflow-hidden pb-4">
  <span
    className="inline-block text-[#0078f0]"
    style={{
    //   textShadow: "0 0 40px #0078f0, 0 0 80px #0078f0"
    }}
  >
    BUILD WEBSITES
  </span>
</div>

            <div className="overflow-hidden">
              <span className="inline-block bg-gradient-to-r from-[#0078f0] via-cyan-400 to-[#0078f0] bg-clip-text text-transparent animate-pulse">
                WE BUILD EMPIRES
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="mt-10 text-2xl md:text-4xl font-light text-zinc-400 max-w-4xl mx-auto leading-relaxed">
            Award-winning digital agency turning visions into 
            <span className="text-[#0078f0] font-bold"> unstoppable brands</span> since 2018
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-12 py-6 bg-[#0078f0] text-black font-bold text-xl rounded-full hover:scale-110 hover:shadow-2xl hover:shadow-[#0078f0]/60 transition-all duration-500 shadow-xl">
              Start Your Project
              <span className="ml-3 inline-block">Right Arrow</span>
            </button>
            <button className="px-12 py-6 border-2 border-zinc-700 text-white font-semibold text-xl rounded-full backdrop-blur-xl hover:border-[#0078f0] hover:text-[#0078f0] hover:shadow-2xl hover:shadow-[#0078f0]/40 transition-all duration-500">
              View Our Work
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-80">
            <div className="text-center">
              <p className="text-5xl font-black text-white">500+</p>
              <p className="text-zinc-500">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-[#0078f0]">10+</p>
              <p className="text-zinc-500">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-white">4.9</p>
              <p className="text-zinc-500">Client Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-10 h-16 border-2 border-zinc-600 rounded-full flex justify-center">
          <div className="w-2 h-5 bg-zinc-400 rounded-full mt-3 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;