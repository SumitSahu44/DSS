import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const sectionRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const visionTextRef = useRef(null);
  const missionTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sab hidden + side mein
      gsap.set(visionRef.current, { x: "-120%", opacity: 0 });
      gsap.set(missionRef.current, { x: "120%", opacity: 0 });
      gsap.set([visionTextRef.current, missionTextRef.current], { y: 120, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1.3,
          // markers: true,
        },
      });

      // Vision — left se aayega
      tl.to(visionRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.8,
        ease: "power3.out",
      });

      // Vision text — thoda baad mein
      tl.to(visionTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.4,
      }, "-=1.2");

      // Mission — right se aayega
      tl.to(missionRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.8,
        ease: "power3.out",
      }, "-=1.6");

      // Mission text
      tl.to(missionTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.4,
      }, "-=1.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 lg:py-64 bg-black text-white overflow-hidden border-t border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* OUR VISION - Left Side */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-32 lg:mb-48">
          <h2
            ref={visionRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                       font-extrabold tracking-tighter text-left
                       bg-gradient-to-r from-blue-400 to-blue-200 
                       text-transparent bg-clip-text
                       w-full lg:w-1/2"
          >
            Our Vision
          </h2>

          <p
            ref={visionTextRef}
            className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300 font-light 
                       text-left lg:text-right w-full lg:w-1/2 max-w-2xl"
          >
            To build a future where every startup, small business and growing brand in India has the power to stand strong in the digital world. We want to support founders whose dreams are big but resources are limited.
            <br /><br />
            <span className="text-blue-300 font-medium text-xl lg:text-2xl">
              Our vision is to remove that barrier.
            </span>
          </p>
        </div>

        {/* OUR MISSION - Right Side */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-20">
          <h2
            ref={missionRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                       font-extrabold tracking-tighter text-right
                       bg-gradient-to-r from-orange-300 to-orange-500 
                       text-transparent bg-clip-text
                       w-full lg:w-1/2"
          >
            Our Mission
          </h2>

          <p
            ref={missionTextRef}
            className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300 font-light 
                       text-left w-full lg:w-1/2 max-w-2xl"
          >
            Our mission is to create real impact, not just complete projects. Through impactful websites, performance-driven marketing and thoughtful branding, we help early-stage entrepreneurs grow faster, compete better and build lasting trust.
            <br /><br />
            <span className="text-orange-300 font-medium text-xl lg:text-2xl">
              Empower Indian businesses • Strengthen Startup India • Digital Success
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default VisionMission;