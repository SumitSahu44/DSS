import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP plugin register karna zaroori hai
gsap.registerPlugin(ScrollTrigger);

const SatisfactionText = () => {
  const containerRef = useRef(null);
  const upperRef = useRef(null);
  const lowerRef = useRef(null);

  useEffect(() => {
    const upper = upperRef.current;
    const lower = lowerRef.current;

    // Starting state: text off-screen
    gsap.set([upper, lower], { y: 120, opacity: 0 });

    // ScrollTrigger animation
    gsap.to(upper, {
      y: 0,
      x: -40,           // thoda left move
      opacity: 1,
      ease: "power3.out",
      duration: 1.6,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",     // jab container 80% viewport mein aaye
        end: "bottom 20%",
        scrub: 1,             // smooth scrolling ke saath move karega
        // markers: true,     // debugging ke liye (baad mein hata dena)
      }
    });

    gsap.to(lower, {
      y: 0,
      x: 40,            // thoda right move
      opacity: 1,
      ease: "power3.out",
      duration: 1.6,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"
    >
      <div className="text-center leading-tight">
        <h1 
          ref={upperRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          style={{ display: 'block' }}
        >
          Your Satisfaction
        </h1>
        <h1 
          ref={lowerRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          style={{ display: 'block' }}
        >
          Is Our Success
        </h1>
      </div>
    </div>
  );
};

export default SatisfactionText;