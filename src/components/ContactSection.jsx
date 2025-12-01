import React, { useEffect, useRef } from "react";
// Using CDN imports
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Reveal Info Side (Left)
      gsap.fromTo(infoRef.current.children, 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // 2. Reveal Form Side (Right)
      gsap.fromTo(formRef.current.children, 
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          delay: 0.2,
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
    <section 
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white py-32 px-6 overflow-hidden font-sans selection:bg-blue-500/30"
    >
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
         {/* Ambient Blobs */}
         <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#0078f0]/10 rounded-full blur-[150px] animate-pulse" />
         <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#ff9f20]/10 rounded-full blur-[150px] animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           
           {/* --- LEFT COLUMN: INFO --- */}
           <div ref={infoRef} className="flex flex-col justify-center">
              
              <div className="flex items-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-[0.3em] mb-8">
                 <div className="w-12 h-[1px] bg-gray-700" />
                 <span>Get In Touch</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                 LET'S BUILD <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">THE FUTURE.</span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-12">
                 Have a project in mind? We help brands scale through design, strategy, and technology. Let's start the conversation.
              </p>

              <div className="space-y-8">
                 <div className="flex items-start gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#0078f0] group-hover:bg-[#0078f0] group-hover:text-white transition-all duration-300">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                       <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Call Us</h4>
                       <p className="text-gray-400 font-light">+1 (555) 000-0000</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#ff9f20] group-hover:bg-[#ff9f20] group-hover:text-black transition-all duration-300">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                       <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Email Us</h4>
                       <p className="text-gray-400 font-light">hello@agency.com</p>
                    </div>
                 </div>
              </div>

           </div>

           {/* --- RIGHT COLUMN: FORM --- */}
           <div ref={formRef} className="bg-white/[0.02] backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
              
              {/* Form Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0078f0]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <form className="relative z-10 flex flex-col gap-8">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                       <input type="text" placeholder="John Doe" className="bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#0078f0] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                       <input type="email" placeholder="john@example.com" className="bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#ff9f20] transition-colors" />
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Service Interest</label>
                    <select className="bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-[#0078f0] transition-colors appearance-none cursor-pointer">
                       <option className="bg-[#111] text-gray-400">Select a service</option>
                       <option className="bg-[#111]">Brand Strategy</option>
                       <option className="bg-[#111]">Web Development</option>
                       <option className="bg-[#111]">UI/UX Design</option>
                       <option className="bg-[#111]">Growth Marketing</option>
                    </select>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                    <textarea rows="4" placeholder="Tell us about your project..." className="bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#ff9f20] transition-colors resize-none"></textarea>
                 </div>

                 <button className="group relative w-full py-5 bg-white text-black font-bold uppercase tracking-widest overflow-hidden rounded-lg mt-4 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Send Message</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0078f0] to-[#ff9f20] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                 </button>

              </form>
           </div>

        </div>

      </div>
    </section>
  );
}