import React, { useEffect, useRef, useState, useMemo } from 'react';
import { HashLink } from "react-router-hash-link";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const statsRef = useRef([]);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // --- SAFE GSAP LOADING ---
  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) {
          setIsGsapReady(true);
          return;
        }
        const loadScript = (src) =>
          new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });

        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        setIsGsapReady(true);
      } catch (err) {
        console.error("GSAP failed", err);
      }
    };
    loadGsap();
  }, []);

  // --- STATS ---
  const stats = useMemo(() => [
    { number: "950+", label: "Happy Clients", x: -300, y: -200 },
    { number: "5+", label: "Years Experience", x: 300, y: -200 },
    { number: "1600+", label: "Projects Delivered", x: -340, y: -20 },
    { number: "40+", label: "Industries Served", x: 340, y: -20 },
    { number: "₹10Cr+", label: "Revenue Generated", x: -260, y: 140 },
    { number: "4.9★", label: "Client Rating", x: 260, y: 140 },
  ], []);

  // --- ANIMATIONS ---
  useEffect(() => {
    if (!isGsapReady || !sectionRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stats Animation Setup
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          x: stats[i].x,
          y: stats[i].y,
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          scale: 0.7,
          opacity: 0,
          position: "absolute",
        });
      });

      // Timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 70%",
        }
      }).to(statsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.4)",
      });

      // Floating animation
      statsRef.current.forEach(stat => {
        gsap.to(stat, {
          y: "+=18",
          repeat: -1,
          yoyo: true,
          duration: 3 + Math.random(),
          ease: "sine.inOut",
          delay: Math.random(),
        });
      });

      // Text Animations
      gsap.fromTo(".char-line", { y: 100, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.4,
        ease: "power4.out"
      });

      gsap.fromTo(".hero-tagline", { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
      });

      gsap.fromTo(".hero-cta", { scale: 0.9, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 1.2,
        ease: "back.out(1.6)"
      });
    }, sectionRef);

    setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => ctx.revert();
  }, [isGsapReady, stats]);

  return (
    <>
      {/* 🔴 CSS STYLE BLOCK (Exact copy from your HTML)
          Yeh styles direct section pe apply honge 
      */}
      <style>{`
        .tech-bg {
          width: 100%;
          position: relative;
          overflow: hidden;
          background-color: #050b18; /* Fallback */

          /* Base futuristic gradient */
          background:
            radial-gradient(circle at bottom center, rgba(0,120,255,0.25), transparent 55%),
            radial-gradient(circle at top right, rgba(0,80,200,0.35), transparent 40%),
            linear-gradient(180deg, #020716 0%, #061a3a 100%);
        }

        /* Grid overlay */
        .tech-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,150,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,150,255,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.4;
          z-index: 1; /* Grid visible above base gradient */
          pointer-events: none;
        }

        /* Particles + glow */
        .tech-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle, rgba(0,200,255,0.15) 2px, transparent 2px),
            radial-gradient(circle, rgba(0,140,255,0.12) 1px, transparent 1px);
          background-size: 120px 120px, 80px 80px;
          opacity: 0.6;
          z-index: 2;
          pointer-events: none;
        }

        /* Bottom futuristic glow */
        .circuit-glow {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 120%;
          height: 200px;
          background: radial-gradient(circle, rgba(0,180,255,0.35), transparent 70%);
          filter: blur(40px);
          z-index: 3;
        }
        
        /* Content ko sabse upar laane ke liye */
        .hero-content-layer {
          position: relative;
          z-index: 10;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="home"
        // 🔴 Maine 'bg-black' aur koi bhi tailwind color hata diya hai taaki CSS dikhe
        className="tech-bg min-h-screen pt-36 flex flex-col items-center px-6"
      >
        {/* Glow Element from HTML */}
        <div className="circuit-glow"></div>

        {/* HERO CONTENT WRAPPER */}
        <div className="hero-content-layer w-full flex flex-col items-center">
          
          <h1 className="hero-title text-center max-w-6xl mb-20">
            {/* Badge */}
            <div className="flex justify-center mb-6 overflow-hidden">
              <div className="hero-cta inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#0078f0]/40 bg-[#0078f0]/15 backdrop-blur-md text-xs tracking-widest uppercase text-[#0078f0] opacity-0">
                Creative Digital Agency
              </div>
            </div>

            {/* TAGLINE */}
            <div className="overflow-hidden">
              <div className="char-line text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
                Your Satisfaction
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="char-line text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-[#ff9f20] to-[#0078f0] bg-clip-text text-transparent">
                  Is Our Success
                </span>
              </div>
            </div>

            {/* SUBTEXT */}
            <p className="hero-tagline mt-6 text-zinc-300 text-base md:text-xl max-w-3xl mx-auto">
              We design, build, and scale high-performing digital solutions that help brands grow with confidence.
            </p>

            <p className="char-line mt-4 text-zinc-500 text-sm md:text-base max-w-2xl mx-auto">
              From strategy to execution, we deliver premium digital experiences powered by innovation, technology, and results.
            </p>
          </h1>

          {/* CTA */}
          <div className="hero-cta mb-24 opacity-0">
            <HashLink smooth to="/LetsConnect">
              <button className="px-12 py-5 rounded-full bg-[#0078f0] text-white font-bold uppercase tracking-wider transition-all duration-500 hover:scale-105 hover:bg-[#ff9f20] hover:shadow-[0_0_50px_-10px_#ff9f20]">
                Start Your Journey
              </button>
            </HashLink>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;