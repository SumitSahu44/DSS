import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularText from './CircularText';

gsap.registerPlugin(ScrollTrigger);

const SatisfactionText = () => {
  const containerRef = useRef(null);
  const upperRef = useRef(null);
  const lowerRef = useRef(null);

  useEffect(() => {
    const upper = upperRef.current;
    const lower = lowerRef.current;

    let ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set([upper, lower], {
        y: 100,
        opacity: 0,
        filter: "blur(15px)",
      });

      // --- ANIMATION 1: ENTRY (Sirf Upar aane ke liye) ---
      gsap.to([upper, lower], {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Screen me aate hi dikhne lagega
          end: "top 50%",
          scrub: 1,
        },
      });

      // --- ANIMATION 2: SLIDING (Ye alag hai taaki pakka chale) ---
      // Responsive distance
      const moveDistance = window.innerWidth < 640 ? window.innerWidth * 0.2 : window.innerWidth * 0.4;

      const tlMove = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",    // Jaise hi dikhna shuru ho
          end: "bottom top",   // Jab tak section pura upar na chala jaye tab tak slide karega
          scrub: 1,            // Instant response scroll ke sath
        },
      });

      // Left Move
      tlMove.to(upper, {
        x: -moveDistance, 
        ease: "none", // 'none' rakhne se scroll ke sath direct connect rehta hai
      }, 0);

      // Right Move (Same time start '0')
      tlMove.to(lower, {
        x: moveDistance,
        ease: "none",
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-32 md:py-52 flex flex-col items-center justify-center 
                 bg-black overflow-hidden px-4 relative z-0"
    >
      
      {/* --- CIRCULAR TEXT --- */}
      <div className="absolute top-6 right-6 md:top-20 md:right-20 z-30">
        <CircularText
          text="Our*Priority*Solutions*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class text-white/80"
        />
      </div>

      {/* --- BLUE GLOW SPOTS --- */}
      <div className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full 
                      bg-[#0078f0] opacity-20 blur-[80px] pointer-events-none -z-10"></div>
      
      <div className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full 
                      bg-[#0078f0] opacity-15 blur-[100px] pointer-events-none -z-10"></div>

      <div className="absolute top-[10%] right-[20%] w-40 h-40 rounded-full 
                      bg-[#0078f0] opacity-20 blur-[60px] pointer-events-none -z-10"></div>


      {/* --- TEXT CONTENT --- */}
      <div className="text-center relative z-20">
        <h1
          ref={upperRef}
          className="text-5xl sm:text-6xl md:text-8xl 
                     font-extrabold tracking-tight leading-none
                     text-[#ff9f20] mb-3 md:mb-5 drop-shadow-lg will-change-transform"
        >
          Your Satisfaction
        </h1>

        <h1
          ref={lowerRef}
          className="text-5xl sm:text-6xl md:text-8xl 
                     font-extrabold tracking-tight leading-none
                     text-[#0078f0] drop-shadow-[0_0_15px_rgba(0,120,240,0.3)] will-change-transform"
        >
          Is Our Success
        </h1>
      </div>
    </div>
  );
};

export default SatisfactionText;