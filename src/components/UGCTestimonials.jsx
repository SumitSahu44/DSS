import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const UGCTestimonials = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const testimonials = [
    { id: 1, video: "/videos/Video-793.mp4", name: "Rohan Sharma", company: "Starlight Solar" },
    { id: 2, video: "/videos/Video-793.mp4", name: "Vikram Singh", company: "MixNuts Premium" },
    { id: 3, video: "/videos/Video-793.mp4", name: "Ankit Patel", company: "Real Estate Pro" },
    { id: 4, video: "/videos/Video-793.mp4", name: "Mayank Jain", company: "TechVision" },
    { id: 5, video: "/videos/Video-793.mp4", name: "Suresh Kumar", company: "Luxury Brand" },
    { id: 6, video: "/videos/Video-793.mp4", name: "Deepak Mehta", company: "E-Commerce Giant" },
    { id: 7, video: "/videos/Video-793.mp4", name: "Rajesh Verma", company: "Digital Empire" },
    { id: 8, video: "/videos/Video-793.mp4", name: "Priya Mehta", company: "Fashion Hub" },
  ];

  useEffect(() => {
  const ctx = gsap.context(() => {
    const slider = sliderRef.current;
    if (!slider) return;    // IMPORTANT FIX

    const cards = Array.from(slider.children);
    if (!cards.length) return;  // Prevents undefined crash

    gsap.from(cards, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%"
      }
    });

    // next prev
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    const scrollAmount = 300;

    const scrollNext = () =>
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });

    const scrollPrev = () =>
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });

    nextBtn?.addEventListener("click", scrollNext);
    prevBtn?.addEventListener("click", scrollPrev);

    return () => {
      nextBtn?.removeEventListener("click", scrollNext);
      prevBtn?.removeEventListener("click", scrollPrev);
    };
  }, containerRef);

  return () => ctx.revert();
}, []);


  return (
    <section ref={containerRef} className="relative bg-black py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#0078f0]/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-tight">
            <span className="bg-gradient-to-r from-white via-[#0078f0] to-white bg-clip-text text-transparent">
              WHAT OUR
            </span>
            <br />
            <span className="text-[#0078f0] [text-shadow:0_0_140px_#0078f0]">
              CLIENTS SAY
            </span>
          </h2>
        </div>

        {/* Slider with Arrows */}
        <div className="relative group">
          {/* Prev Button */}
          <button
            id="prev-btn"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/70 backdrop-blur-md border border-zinc-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 hover:bg-[#0078f0] hover:border-[#0078f0]"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          {/* Next Button */}
          <button
            id="next-btn"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/70 backdrop-blur-md border border-zinc-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 hover:bg-[#0078f0] hover:border-[#0078f0]"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>

          {/* Horizontal Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-20 md:px-24"
          >
            {testimonials.concat(testimonials).map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 snap-center"
              >
                <div className="relative rounded-2xl overflow-hidden border-4 border-zinc-900 bg-black shadow-2xl hover:border-[#0078f0]/60 transition-all duration-500">
                  <video
                    src={t.video}
                    className="w-full h-80 md:h-96 object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white">{t.name}</h3>
                    <p className="text-[#0078f0] font-semibold text-sm mt-1">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Hint */}
        <div className="text-center mt-12 md:hidden">
          <p className="text-zinc-600 text-sm">Swipe to explore</p>
        </div>

        {/* Stats */}
        <div className="text-center mt-20">
          <p className="text-2xl md:text-3xl text-zinc-300 font-light">
            <span className="text-[#0078f0] font-bold">500+</span> Happy Clients • 
            <span className="text-[#0078f0] font-bold"> 10+</span> Countries • 
            <span className="text-[#0078f0] font-bold"> 7</span> Years of Trust
          </p>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default UGCTestimonials;