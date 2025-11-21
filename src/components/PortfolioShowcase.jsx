import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const PortfolioShowcase = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Yeh apne real projects ke URLs daal dena
  const projects = [
    { id: 1, title: "Starlight Solar", url: "https://starlightsolar.ca" },
    { id: 2, title: "MixNuts Premium", url: "https://cardialsoul.in/" },
    { id: 3, title: "Realtor Partnership", url: "https://lithoveda.com/" },
    { id: 4, title: "Luxury E-commerce", url: "https://vanyariverresort.com/" },
    { id: 5, title: "Tech Startup Dashboard", url: "https://fitorashop.com/" },
    { id: 6, title: "Creative Agency 2025", url: "https://planetenviro.in/" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards stagger reveal
      gsap.fromTo(cardsRef.current, 
        { y: 200, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-32 overflow-hidden">
      {/* Moving Gradient Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0078f0]/20 via-transparent to-[#0078f0]/20 animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-white via-[#0078f0] to-white bg-clip-text text-transparent">
              Our Work
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 mt-6 font-light">
            Hover karo — websites khud chal ke dikhaengi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => cardsRef.current[index] = el}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Electric Blue Glow on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#0078f0] via-transparent to-[#0078f0] opacity-0 group-hover:opacity-100 blur-xl transition duration-1000" />
              
              {/* Card Background */}
              <div className="relative h-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
                {/* Live Preview Iframe */}
                <div className="relative w-full h-full">
                  <iframe
                    src={project.url}
                    className="w-full h-full scale-100 origin-top-left transition-transform duration-700 group-hover:scale-90"
                    title={project.title}
                    loading="lazy"
                  />

                  {/* Auto Scroll Magic on Hover */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    data-scroll-container={index}
                  />
                </div>

                {/* Overlay Title + Glow */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/70 to-transparent">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[#0078f0] font-medium flex items-center gap-3">
                    Live Preview 
                    <span className="inline-block w-2 h-2 bg-[#0078f0] rounded-full animate-ping" />
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[#0078f0] to-blue-600 rounded-2xl opacity-0 group-hover:opacity-80 blur-xl transition duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto Scroll Script - Yeh sabse tagda part hai */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelectorAll('[data-scroll-container]').forEach(container => {
              const iframe = container.previousElementSibling;
              let scrollInterval;

              container.parentElement.addEventListener('mouseenter', () => {
                let scrollPos = 0;
                scrollInterval = setInterval(() => {
                  if (iframe.contentWindow) {
                    scrollPos += 3;
                    iframe.contentWindow.scrollTo(0, scrollPos);
                    if (scrollPos > iframe.contentWindow.document.body.scrollHeight - window.innerHeight) {
                      scrollPos = 0;
                    }
                  }
                }, 30);
              });

              container.parentElement.addEventListener('mouseleave', () => {
                clearInterval(scrollInterval);
              });
            });
          `
        }}
      />
    </section>
  );
};

export default PortfolioShowcase;