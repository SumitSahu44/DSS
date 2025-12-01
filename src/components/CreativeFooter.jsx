import React, { useEffect, useRef } from "react";
// Using CDN imports for GSAP
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Reveal Footer Content
      gsap.fromTo(footerRef.current.children, 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );

      // 2. Big Text Parallax
      gsap.to(".footer-bg-text", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#050505] text-white pt-20 md:pt-32 pb-10 overflow-hidden font-sans border-t border-white/5"
    >
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
         
         {/* Gradient Mesh */}
         <div className="absolute bottom-0 left-[-20%] w-[60vw] h-[60vw] bg-[#0078f0]/10 rounded-full blur-[150px]" />
         <div className="absolute top-0 right-[-20%] w-[60vw] h-[60vw] bg-[#ff9f20]/10 rounded-full blur-[150px]" />

         {/* MASSIVE BACKGROUND TEXT */}
         <div className="footer-bg-text absolute bottom-0 left-0 w-full text-center pointer-events-none select-none overflow-hidden">
            <h1 className="text-[18vw] md:text-[20vw] font-black text-white/[0.02] leading-none tracking-tighter">
               AGENCY
            </h1>
         </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- 1. BIG CALL TO ACTION --- */}
        <div ref={ctaRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 pb-16 md:pb-24 border-b border-white/10">
           <div className="max-w-3xl">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                 READY TO <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">SCALE UP?</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl">
                 Let's build something that defines your industry. Schedule a call with our strategy team today.
              </p>
           </div>
           
           {/* CTA Button */}
           <a href="#contact" className="group relative mt-8 md:mt-0 inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm overflow-hidden rounded-full transition-transform hover:scale-105">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Project</span>
              <div className="absolute inset-0 bg-[#0078f0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
           </a>
        </div>

        {/* --- 2. MAIN GRID LINKS --- */}
        {/* Mobile: 2 Columns Grid | Desktop: 12 Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 mb-16 md:mb-24">
           
           {/* Column 1: Brand Info (Full width on mobile for newsletter space) */}
           <div className="col-span-2 md:col-span-4 flex flex-col gap-6">
              <div className="text-2xl font-black tracking-tighter">
                 AGENCY<span className="text-[#0078f0]">.</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                 We are a digital innovation agency crafting world-class experiences for brands that dare to lead.
              </p>
              
              {/* Newsletter */}
              <div className="mt-2">
                 <p className="text-xs uppercase tracking-widest text-white mb-3">Subscribe to Insights</p>
                 <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0078f0] transition-colors w-full"
                    />
                    <button className="bg-white/10 hover:bg-[#0078f0] text-white px-4 py-3 rounded-lg transition-colors">
                       →
                    </button>
                 </div>
              </div>
           </div>

           {/* Column 2: Sitemap (Half width on mobile) */}
           <div className="col-span-1 md:col-span-2 md:col-start-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 md:mb-6">Explore</h4>
              <ul className="flex flex-col gap-3 md:gap-4 text-gray-400 text-sm">
                 {['Work', 'Services', 'Agency', 'Careers', 'Contact'].map(item => (
                    <li key={item}>
                       <a href="#" className="hover:text-[#ff9f20] transition-colors flex items-center gap-2 group">
                          <span className="w-0 group-hover:w-2 h-[1px] bg-[#ff9f20] transition-all duration-300" />
                          {item}
                       </a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Column 3: Services (Half width on mobile) */}
           <div className="col-span-1 md:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 md:mb-6">Services</h4>
              <ul className="flex flex-col gap-3 md:gap-4 text-gray-400 text-sm">
                 {['Brand Strategy', 'UI/UX Design', 'Web Development', 'Growth Marketing', 'Content Creation'].map(item => (
                    <li key={item}>
                       <a href="#" className="hover:text-[#0078f0] transition-colors">
                          {item}
                       </a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Column 4: Contact & Socials (Full width on mobile for balance) */}
           <div className="col-span-2 md:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 md:mb-6">Connect</h4>
              <p className="text-gray-400 text-sm mb-1">hello@agency.com</p>
              <p className="text-gray-400 text-sm mb-6">+1 (555) 123-4567</p>
              
              <div className="flex gap-4">
                 {['Li', 'Tw', 'In', 'Be'].map((social, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                       {social}
                    </a>
                 ))}
              </div>
           </div>

        </div>

        {/* --- 3. BOTTOM BAR (Legal) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600 font-mono uppercase tracking-wider gap-4 md:gap-0">
           <div className="flex gap-6">
              <span>© 2024 Agency Inc.</span>
           </div>
           
           <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
           </div>
        </div>

      </div>
    </footer>
  );
}