import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiTarget, FiCode, FiVolume2, FiFigma, FiFilm, FiTrendingUp } from "react-icons/fi";

import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const CreativeAgencySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Background moving gradient glow
      gsap.to(glowRef.current, {
        xPercent: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        }
      });

      // Main Title - Split + Slide In
      gsap.fromTo(titleRef.current.children, {
        y: 200,
        skewY: 10,
        opacity: 0,
      }, {
        y: 0,
        skewY: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        }
      });

      // Cards Animation - Scale + Float + Glow
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, {
          y: 150,
          opacity: 0,
          scale: 0.8,
          rotation: i % 2 === 0 ? -8 : 8,
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.6,
          delay: i * 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });

        // Hover micro-interaction
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.08, y: -20, duration: 0.5, ease: "power3.out" });
        //   gsap.to(card.querySelector(".glow"), { opacity: 0.7, scale: 1.3, duration: 0.6 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.6 });
        //   gsap.to(card.querySelector(".glow"), { opacity: 0, scale: 1, duration: 0.6 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

 const services = [
  { title: "Brand Strategy", icon: <FiTarget size={35} /> },
  { title: "Web Development", icon: <FiCode size={35} /> },
  { title: "Digital Marketing", icon: <FiVolume2 size={35} /> },
  { title: "UI/UX Design", icon: <FiFigma size={35} /> },
  { title: "Motion Graphics", icon: <FiFilm size={35} /> },
  { title: "SEO & Growth", icon: <FiTrendingUp size={35} /> },
];


  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white overflow-hidden py-20">
      {/* Animated Gradient Glow Background */}
      <div ref={glowRef} className="absolute inset-0 opacity-30 pointer-events-none">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0078f0] to-transparent blur-3xl translate-x-[-100%]" /> */}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Title */}
        <div ref={titleRef} className="text-center mb-20 overflow-hidden">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter">
            <span className="inline-block bg-gradient-to-r from-white to-[#0078f0] bg-clip bg-clip-text text-transparent">
              We Craft
            </span>
          </h2>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter -mt-8 md:-mt-12">
            <span className="inline-block bg-gradient-to-r from-[#0078f0] to-white bg-clip-text text-transparent">
              Digital Mastery
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="relative group cursor-pointer"
            >
              {/* Glow Effect */}
              <div className="glow absolute -inset-2 bg-[#0078f0] rounded-3xl blur-xl opacity-0 transition-opacity duration-700" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-3xl p-10 h-full backdrop-blur-xl hover:border-[#0078f0] transition-all duration-700">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0078f0] to-blue-600 rounded-2xl mb-6 flex items-center justify-center text-3xl">
                {service.icon}
                </div>

                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  {service.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed">
                  Transforming ideas into powerful digital experiences with cutting-edge technology.
                </p>
                
                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                  <div className="particle absolute w-2 h-2 bg-[#0078f0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
                       style={{ top: "20%", left: "10%", animation: "float 6s infinite" }} />
                  <div className="particle absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-80 delay-300" 
                       style={{ top: "60%", right: "15%", animation: "float 8s infinite reverse" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
      `}</style>
    </section>
  );
};

export default CreativeAgencySection;