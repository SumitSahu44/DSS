import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const UGCTestimonials = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const testimonials = [
    { id: 1, video: "/videos/Video-793.mp4", name: "Rohan Sharma", company: "Starlight Solar" },
    { id: 2, video: "/videos/Video-793.mp4", name: "Vikram Singh", company: "MixNuts Premium" },
    { id: 3, video: "/videos/Video-793.mp4", name: "Ankit Patel", company: "Real Estate Pro" },
    { id: 4, video: "/videos/Video-793.mp4", name: "Mayank Jain", company: "TechVision" },
    { id: 5, video: "/videos/Video-793.mp4", name: "Suresh Kumar", company: "Luxury Brand" },
    { id: 6, video: "/videos/Video-793.mp4", name: "Deepak Mehta", company: "E-Commerce Giant" },
    { id: 7, video: "/videos/Video-793.mp4", name: "Rajesh Verma", company: "Digital Empire" },
  ];

  useEffect(() => {
    const cards = sliderRef.current?.children;

    if (!cards) return;

    Array.from(cards).forEach((card) => {
      const video = card.querySelector('video');

      const playWithSound = () => {
        if (video) {
          video.muted = false;
          video.volume = 0.8;
          video.play().catch(() => {});
        }
        gsap.to(card, { scale: 1.04, duration: 0.6, ease: "power3.out" });
      };

      const muteVideo = () => {
        if (video) video.muted = true;
        gsap.to(card, { scale: 1, duration: 0.8 });
      };

      card.addEventListener('mouseenter', playWithSound);
      card.addEventListener('touchstart', playWithSound, { passive: true });
      card.addEventListener('mouseleave', muteVideo);
      card.addEventListener('touchend', muteVideo);

      // Scroll reveal
      gsap.fromTo(card,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        }
      );
    });

    // Cleanup listeners on unmount
    return () => {
      Array.from(cards).forEach(card => {
        card.removeEventListener('mouseenter', playWithSound);
        card.removeEventListener('touchstart', playWithSound);
        card.removeEventListener('mouseleave', muteVideo);
        card.removeEventListener('touchend', muteVideo);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0078f0] rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-tight">
            <span className="bg-gradient-to-r from-white via-[#0078f0] to-white bg-clip-text text-transparent">
              WHAT OUR
            </span>
            <br />
            <span className="text-[#0078f0] [text-shadow:0_0_140px_#0078f0] drop-shadow-2xl">
              CLIENTS SAY
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-zinc-400">Swipe / Hover → Hear real voices</p>
        </div>

        {/* Horizontal Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-6 md:px-0 pb-4"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[320px] md:w-96 snap-center group"
              >
                <div className="relative">
                  {/* Glow on Hover */}
                  <div className="absolute -inset-6 bg-[#0078f0] rounded-3xl blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10" />

                  {/* Phone Frame Card */}
                  <div className="relative rounded-3xl overflow-hidden border-8 border-zinc-900 shadow-2xl bg-black">
                    <video
                      src={t.video}
                      className="w-full h-96 md:h-[600px] object-cover"
                      loop
                      muted
                      playsInline
                      autoPlay
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                    {/* Client Info */}
                    <div className="absolute bottom-0 left-0 p-8 text-left">
                      <h3 className="text-2xl font-bold text-white drop-shadow-2xl">{t.name}</h3>
                      <p className="text-[#0078f0] font-bold text-lg drop-shadow-lg">{t.company}</p>
                    </div>

                    {/* Sound Icon on Hover */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                        <svg className="w-8 h-8 text-[#0078f0]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="text-center mt-10 md:hidden">
            <p className="text-zinc-500 text-sm">← Swipe to see more →</p>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mt-20">
          <p className="text-2xl md:text-3xl text-zinc-300 font-light">
            <span className="text-[#0078f0] font-bold">500+</span> Happy Clients • 
            <span className="text-[#0078f0] font-bold"> 10+</span> Countries • 
            <span className="text-[#0078f0] font-bold"> 7</span> Years Strong
          </p>
        </div>
      </div>

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