import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const containerRef = useRef(null);
  const visionTitleRef = useRef(null);
  const visionTextRef = useRef(null);
  const missionTitleRef = useRef(null);
  const missionTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hidden state
      gsap.set(
        [visionTitleRef.current, visionTextRef.current, missionTitleRef.current, missionTextRef.current],
        { y: 180, opacity: 0 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1.3,
          // markers: true,
        },
      });

      // Vision Title → Slide up + fade
      tl.to(visionTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      // Vision Text → slightly delayed
      tl.to(
        visionTextRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
        },
        "-=0.9"
      );

      // Horizontal split movement (Vision title left, Mission title right)
      const moveX = () => (window.innerWidth < 768 ? 80 : window.innerWidth * 0.22);

      tl.to(
        visionTitleRef.current,
        {
          x: () => -moveX(),
          ease: "power2.inOut",
          duration: 2,
        },
        "-=1"
      );

      // Mission Title → enter after Vision is settled
      tl.to(
        missionTitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      );

      tl.to(
        missionTitleRef.current,
        {
          x: () => moveX(),
          ease: "power2.inOut",
          duration: 2,
        },
        "-=1.8"
      );

      // Mission Text
      tl.to(
        missionTextRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
        },
        "-=1.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 lg:py-64 bg-black text-white overflow-hidden border-t border-b border-gray-800"
    >
      {/* Optional subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Vision */}
        <div className="mb-24 lg:mb-32">
          <h2
            ref={visionTitleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                       font-extrabold tracking-tighter text-center lg:text-left
                       bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 
                       text-transparent bg-clip-text"
          >
            Our Vision
          </h2>

          <p
            ref={visionTextRef}
            className="mt-10 md:mt-14 max-w-5xl mx-auto lg:mx-0 text-lg md:text-xl lg:text-2xl 
                       leading-relaxed text-gray-300 font-light opacity-90 text-center lg:text-left"
          >
            To build a future where every startup, small business and growing brand in India has the power to stand strong in the digital world. We want to support founders whose dreams are big but resources are limited. Many young businesses never reach their true potential because they cannot afford the level of digital presence and branding they need.
            <span className="block mt-6 text-cyan-400 font-medium">
              Our vision is to remove that barrier.
            </span>
          </p>
        </div>

        {/* Mission */}
        <div className="mt-24 lg:mt-40">
          <h2
            ref={missionTitleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                       font-extrabold tracking-tighter text-center lg:text-right
                       bg-gradient-to-r from-orange-300 via-pink-400 to-red-500 
                       text-transparent bg-clip-text"
          >
            Our Mission
          </h2>

          <p
            ref={missionTextRef}
            className="mt-10 md:mt-14 max-w-5xl mx-auto lg:ml-auto text-lg md:text-xl lg:text-2xl 
                       leading-relaxed text-gray-300 font-light opacity-90 text-center lg:text-right"
          >
            Our mission is to create real impact, not just complete projects. We help businesses from every industry grow with clarity and reach. Through impactful websites, performance-driven marketing and thoughtful branding, we help early-stage entrepreneurs grow faster, compete better and build lasting trust.
            <span className="block mt-6 text-orange-400 font-medium">
              Empowering Indian businesses • Strengthening Startup India • Building Digital Success
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;