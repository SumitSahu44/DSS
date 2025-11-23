import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { FiInstagram, FiYoutube, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CreativeFooter = () => {
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const linksRef = useRef([]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    gsap.to(window, {
      duration: 1.6,
      scrollTo: { y: `#${sectionId}`, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current.children,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        }
      );

      // Links stagger
      gsap.from(linksRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Quick links with correct IDs
  const quickLinks = [
    { name: "Home", id: "home" },
     { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-white overflow-hidden pt-32 pb-16"
    >
      {/* Subtle Glow (optional - uncomment if you want back) */}
      {/* <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0078f0] via-transparent to-[#ff6b00] blur-3xl" />
      </div> */}

      <div className="container mx-auto px-6 relative z-10">
        {/* Big Bold Heading */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Let's Build
            </span>
          </h2>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none -mt-6 md:-mt-8">
            <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              Something Epic
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Left - Contact Info */}
          <div ref={(el) => (linksRef.current[0] = el)} className="space-y-8">
            <h3 className="text-3xl  font-black bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Get in Touch
            </h3>
            <div className="space-y-6">
              <a
                href="mailto:hello@youragency.com"
                className="flex items-center gap-4 text-lg md:text-xl group hover:text-blue-400 transition-all"
              >
                <FiMail className="text-2xl group-hover:scale-110 transition-transform" />
                <span>hello@youragency.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 text-lg md:text-xl group hover:text-orange-400 transition-all"
              >
                <FiPhone className="text-2xl group-hover:scale-110 transition-transform" />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-4 text-lg md:text-xl">
                <FiMapPin className="text-2xl text-orange-400" />
                <span>Mumbai • Delhi • Bangalore</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 pt-8">
              {[
                { icon: <FiInstagram size={26} />, link: "https://www.instagram.com/digitalsuccess_solutions/" },
                // { icon: <FiYoutube size={26} />, link: "https://youtube.com" },
                { icon: <FiLinkedin size={26} />, link: "https://www.linkedin.com/company/digital-success-solutions-dss/posts/?feedView=all" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center 
                  hover:bg-gradient-to-br hover:from-blue-500 hover:to-orange-500 hover:border-transparent 
                  hover:scale-110 transition-all duration-500 group"
                >
                  <span className="group-hover:scale-125 transition-transform text-white">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Center - Quick Links (Now Clickable!) */}
          <div ref={(el) => (linksRef.current[1] = el)} className="space-y-8">
            <h3 className="text-3xl  font-black bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              Navigate
            </h3>
            <ul className="space-y-4 text-lg text-zinc-400">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-white hover:translate-x-3 inline-block transition-all duration-300 text-left w-full"
                  >
                    → {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - CTA */}
          <div ref={(el) => (linksRef.current[2] = el)} className="flex flex-col items-start justify-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="relative px-10 md:px-12 py-5 md:py-6 text-xl md:text-2xl font-black rounded-3xl overflow-hidden group cursor-pointer
              bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500
              shadow-2xl hover:shadow-blue-500/50 transition-all duration-500"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>

            <p className="mt-8 text-zinc-400 text-base md:text-lg max-w-sm">
              Ready to turn your vision into digital reality? Let's create something unforgettable.
            </p>
          </div>
        </div>

        {/* Bottom Credit */}
        <div className="text-center mt-20 pt-16 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm">
            © 2025. Crafted with <span className="text-orange-500">♥</span> & powered by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-orange-500 bg-clip-text text-transparent font-bold">
              Digital Success Solutions
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CreativeFooter;