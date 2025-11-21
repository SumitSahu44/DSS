import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const InfiniteServicesMarquee = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const titleRef = useRef(null);

  const services = [
    { title: "Brand Identity", icon: "Palette", color: "from-cyan-400 to-blue-600" },
    { title: "Web Development", icon: "Code", color: "from-purple-500 to-pink-600" },
    { title: "UI/UX Design", icon: "Figma", color: "from-emerald-400 to-teal-600" },
    { title: "Digital Marketing", icon: "Megaphone", color: "from-orange-500 to-red-600" },
    { title: "Motion & 3D", icon: "Sparkles", color: "from-indigo-500 to-[#0078f0]" },
    { title: "SEO & Growth", icon: "TrendingUp", color: "from-yellow-400 to-amber-600" },
    { title: "E-Commerce", icon: "ShoppingBag", color: "from-rose-500 to-pink-700" },
    { title: "App Development", icon: "Smartphone", color: "from-[#0078f0] to-cyan-500" },
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;

    // Title animation
    gsap.fromTo(titleRef.current, 
      { x: -300, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Horizontal scroll animation
    gsap.to(marquee.children, {
      x: "-50%", // Perfect seamless loop ke liye
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-32 overflow-hidden">
      {/* Title */}
      <div className="container mx-auto px-6 mb-20">
        <h2 ref={titleRef} className="text-7xl md:text-9xl font-black tracking-tighter text-center leading-tight">
          <span className="bg-gradient-to-r from-white via-[#0078f0] to-white bg-clip-text text-transparent">
            Services That
          </span>
          <br />
          <span className="text-[#0078f0] [text-shadow:0_0_100px_#0078f0]">
            Win Markets
          </span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
        
        <div ref={marqueeRef} className="flex gap-12 px-12 items-center">
          {/* Duplicate twice for seamless infinite loop */}
          {[...services, ...services].map((service, i) => (
            <div
              key={i}
              className="group relative flex-shrink-0 w-96 h-96 rounded-3xl overflow-hidden cursor-pointer group"
            >
              {/* Hover Glow */}
              <div 
                className="absolute -inset-4 bg-gradient-to-br opacity-0 group-hover:opacity-80 blur-3xl transition-opacity duration-1000 -z-10"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${service.color.split(' ')[1]}, transparent 60%)`
                }}
              />

              {/* Card */}
              <div className="relative w-full h-full bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-12 flex flex-col justify-end hover:border-[#0078f0] transition-all duration-700">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${service.color} mb-8 flex items-center justify-center text-5xl shadow-2xl`}>
                  {service.icon}
                </div>
                
                <h3 className="text-4xl font-black text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  High-impact solutions that drive real business results with cutting-edge technology.
                </p>
                
                <div className="flex items-center gap-3 text-[#0078f0] font-bold text-lg">
                  Explore →
                  <svg className="w-8 h-8 group-hover:translate-x-0 group-hover:translate-x-8 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Floating Ping */}
              <div className="absolute top-10 right-10 w-4 h-4 bg-[#0078f0] rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center py-20">
        <p className="text-3xl font-light text-zinc-400">
          Scroll to discover all services →
        </p>
      </div>
    </section>
  );
};

export default InfiniteServicesMarquee;