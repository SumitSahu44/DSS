import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { id: 1, value: 5, suffix: "+", label: "Years Experience", color: "text-[#ff9f20]" },
  { id: 2, value: 1600, suffix: "+", label: "Projects Delivered", color: "text-white" },
  { id: 3, value: 950, suffix: "+", label: "Happy Clients", color: "text-white" },
  { id: 4, value: 30, suffix: "+", label: "Expert Team", color: "text-[#0078f0]" },
  { id: 5, value: 350, suffix: "+", label: "Websites Built", color: "text-white" },
  { id: 6, value: 10, suffix: " Cr+", label: "Ad Budget Managed", color: "text-[#ff9f20]" }, // Highlighted
  { id: 7, value: 120, suffix: "+", label: "Active Clients", color: "text-white" },
  { id: 8, value: 40, suffix: "+", label: "Industries Served", color: "text-[#0078f0]" },
];

export default function AboutDigitalSuccess() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const statsContainerRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. TEXT REVEAL ANIMATION
      gsap.from(textRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      });

      // 2. COUNTER ANIMATION FOR STATS
      // Ye tabhi chalega jab stats screen par aayenge
      statsData.forEach((stat, index) => {
        const element = numberRefs.current[index];
        if (!element) return;

        gsap.fromTo(element, 
          { innerText: 0 }, 
          {
            innerText: stat.value,
            duration: 2.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: 'top 85%',
            },
            snap: { innerText: 1 }, // Ensures whole numbers
            onUpdate: function() {
              // Updates text content during animation
              element.innerText = Math.ceil(this.targets()[0].innerText) + stat.suffix;
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#050505] py-24 px-6 md:px-12 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0078f0]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff9f20]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* --- GRID LAYOUT: LEFT CONTENT | RIGHT STATS --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: STORYTELLING */}
          <div ref={textRef} className="space-y-8 relative z-10">
            <div>
              <span className="text-[#ff9f20] font-bold tracking-[0.2em] text-sm uppercase flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#ff9f20]"></span>
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">
                Indore's Premier <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  Digital Powerhouse.
                </span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed">
              <strong className="text-white">Digital Success Solutions</strong> is more than just an agency; we are growth partners for NGOs, startups, and ambitious brands. 
              Based in the heart of <span className="text-[#0078f0]">Indore (M.P.)</span>, we blend creative storytelling with data-driven performance to turn businesses into brands.
            </p>

            <div className="border-l-4 border-[#ff9f20] pl-6 py-2 bg-white/[0.02] rounded-r-lg">
              <p className="text-gray-300 italic">
                "We don't just run ads; we engineer growth. From high-performance websites to ROI-driven campaigns, we build strong digital identities that last."
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
               {['Creative Strategy', 'Performance Marketing', 'Web Development', 'Branding'].map((tag, i) => (
                 <span key={i} className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300 bg-white/5 hover:border-[#0078f0] transition-colors cursor-default">
                   {tag}
                 </span>
               ))}
            </div>
          </div>

          {/* RIGHT SIDE: THE NUMBERS (GRID) */}
          <div ref={statsContainerRef} className="relative z-10">
            {/* The Grid Card Effect */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {statsData.map((stat, i) => (
                <div 
                  key={stat.id}
                  className={`
                    group p-6 rounded-2xl border border-white/5 bg-[#0a0f1d] hover:bg-white/[0.03] transition-all duration-300
                    ${stat.id === 6 ? 'col-span-2 bg-gradient-to-r from-[#ff9f20]/10 to-[#0a0f1d] border-[#ff9f20]/30' : ''} 
                    /* ^ Make the '10 Cr' budget card wider and highlighted */
                  `}
                >
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 group-hover:text-white transition-colors">
                    {stat.label}
                  </p>
                  <h3 
                    ref={el => numberRefs.current[i] = el}
                    className={`text-4xl md:text-5xl font-bold ${stat.color}`}
                  >
                    0
                  </h3>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}