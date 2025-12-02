import React, { useEffect, useRef, useState } from 'react';
import gsap from 'https://esm.sh/gsap';

const Preloader = () => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Lock Scroll during loading
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Unlock Scroll when animation finishes
          document.body.style.overflow = '';
          document.body.style.cursor = 'default';
        }
      });

      // --- STEP 1: LOADING ANIMATION (0% to 100%) ---
      // Hum dummy counter chala rahe hain jo 1.5 second lega
      tl.to(counterRef.current, {
        innerText: 100,
        duration: 1.5,
        snap: { innerText: 1 }, // Integers only
        ease: "power2.inOut",
        onUpdate: function() {
          const val = Math.ceil(this.targets()[0].innerText);
          setCount(val); // React state update for visual consistency if needed
          if (progressRef.current) {
             progressRef.current.style.width = `${val}%`;
          }
        }
      });

      // --- STEP 2: TEXT FADE OUT ---
      tl.to(".preloader-content", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in",
      });

      // --- STEP 3: CURTAIN REVEAL (Slide Up) ---
      tl.to(containerRef.current, {
        height: 0,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.1
      });

      // --- STEP 4: HIDE COMPLETELY (Cleanup) ---
      tl.set(containerRef.current, {
        display: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-screen bg-[#050505] z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-wait"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* --- CONTENT WRAPPER --- */}
      <div className="preloader-content relative z-10 flex flex-col items-center w-full max-w-md px-6">
        
        {/* Animated Text */}
        <div className="mb-8 text-center overflow-hidden">
            <h2 className="text-white text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2">
                Digital Success
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-mono tracking-[0.3em] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#0078f0] animate-pulse" />
                Loading Experience
            </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4 relative">
            {/* Moving Bar */}
            <div 
                ref={progressRef}
                className="h-full bg-gradient-to-r from-[#0078f0] to-[#ff9f20] w-0 transition-all duration-75 ease-linear"
            />
        </div>

        {/* Percentage Counter */}
        <div className="flex justify-between w-full text-white font-mono text-sm md:text-base font-bold">
            <span>00</span>
            <span ref={counterRef}>0</span>
        </div>

      </div>

      {/* Footer Text (Optional) */}
      <div className="preloader-content absolute bottom-10 text-white/20 text-[10px] uppercase tracking-widest">
         Indore • MP • India
      </div>

    </div>
  );
};

export default Preloader;
