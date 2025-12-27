import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// --- CUSTOMIZE CONTENT HERE (PERFORMANCE MARKETING SPECIFIC) ---
const serviceData = {
  id: "performance-marketing",
  title: "Performance Marketing Services",
  subtitle: "Drive Measurable Growth, Leads & Sales",
  // Combined the Intro text
  description:
    "In today's competitive digital environment, simply running ads is not enough. Businesses need marketing that clearly tracks the outcome of every rupee, be it a lead, a sale, or an inquiry. Performance marketing is a result-driven digital marketing strategy in which campaigns are optimized based on data, analytics, and ROI. Its main focus is maximum output with controlled cost.",
  
  // "What is Performance Marketing?" -> Mapped to Features Grid
  measurableActions: [
    {
      title: "Website Leads",
      desc: "The first step to business growth. When the right audience visits a website and inquires, the sales pipeline naturally strengthens. Quality leads significantly increase conversion chances.",
    },
    {
      title: "Online Sales",
      desc: "Directly linked to revenue. Proper marketing and an optimized user journey convert visitors into buyers, leading to fast and scalable growth for a business.",
    },
    {
      title: "App Installs",
      desc: "Create a direct connection between a brand and customer. More installs mean more engagement and repeat users, helping with long-term customer retention.",
    },
    {
      title: "Calls & Inquiries",
      desc: "Identify high-intent customers who have a genuine interest. Therefore, their conversion rate is significantly higher.",
    },
    {
      title: "Form Submission",
      desc: "Provide detailed customer information. This data makes follow-up and personalized communication easier, making the sales process more effective.",
    },
  ],

  // "Performance Marketing Channels"
  channels: [
    {
      number: "01",
      title: "Google Ads (Search, Display & YouTube)",
      desc: "The most powerful channel. Search ads are best for direct sales and inquiries, while display and YouTube ads are used for brand awareness and remarketing.",
    },
    {
      number: "02",
      title: "Social Media Ads (Meta)",
      desc: "Facebook and Instagram ads are perfect for audience targeting based on interest, behavior, and demographics to increase brand awareness and traffic.",
    },
    {
      number: "03",
      title: "LinkedIn Ads (B2B)",
      desc: "Best for B2B businesses. We target decision-makers, founders, and professionals to generate high-quality B2B leads.",
    },
    {
      number: "04",
      title: "Remarketing Campaigns",
      desc: "Targets users who have previously visited a website. This strategy improves conversion rates multiple times.",
    },
  ],

  // "Industries"
  industries: [
    { title: "Real Estate", desc: "Direct access to genuine buyers and investors. Faster deal closures." },
    { title: "E-Commerce", desc: "Converting traffic into buyers. Revenue and repeat customers increase." },
    { title: "Fashion & Cosmetic", desc: "Visual marketing and storytelling to increase brand awareness and sales." },
    { title: "Hospitals & Clinics", desc: "Builds patient trust. Online appointments and inquiries increase." },
    { title: "Coaching Institutes", desc: "Increase student inquiries and admissions. Brand credibility improves." },
    { title: "Restaurants & Cafes", desc: "Local marketing increases footfall, online orders, and brand recall." },
    { title: "Gyms & Fitness", desc: "Increases memberships and trial inquiries. Health-focused content builds trust." },
    { title: "IT & Startups", desc: "Powerful tool for brand visibility, lead generation, and business scaling." },
  ],

  // "Benefits"
  benefits: [
    "Measurable Results (Exact ROI)",
    "Low Cost Per Lead",
    "High ROI & Profitability",
    "Fast Growth & Quick Results",
    "Real-Time Optimization",
    "Budget Control & Transparency",
    "Scalable Campaigns",
  ],

  // "Comparison: Traditional vs Performance"
  comparison: [
    { aspect: "Results", traditional: "Vague, difficult to measure ROI.", performance: "Measurable, clear achievements." },
    { aspect: "Costs", traditional: "High, unpredictable.", performance: "Controlled, effective utilization." },
    { aspect: "Targeting", traditional: "Limited, broad audience.", performance: "Precise (Behavior & Interests)." },
    { aspect: "Growth & ROI", traditional: "Slow, uncertain.", performance: "Fast growth, clear ROI." },
  ]
};

const PerformanceMarketing = () => {
  const containerRef = useRef(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // --- 1. SAFE GSAP LOADING ---
  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) {
          setIsGsapReady(true);
          return;
        }
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
            const script = document.createElement("script");
            script.src = src; script.async = true; script.onload = resolve; script.onerror = reject;
            document.body.appendChild(script);
          });
        };
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
        setIsGsapReady(true);
      } catch (error) { console.error("GSAP loading failed", error); }
    };
    loadGsap();
  }, []);

  // --- 2. ANIMATIONS ---
  useEffect(() => {
    if (!isGsapReady || !containerRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // Title Parallax
      gsap.fromTo(".svc-title-char", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: "power4.out" }
      );

      // Feature/Action Cards Fade Up
      gsap.utils.toArray(".feature-card").forEach((card) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%" }
          }
        );
      });

      // Channel Line Animation
      gsap.fromTo(".process-line",
        { height: "0%" },
        {
          height: "100%", ease: "none",
          scrollTrigger: {
            trigger: ".process-container",
            start: "top center",
            end: "bottom center",
            scrub: 1,
          }
        }
      );

      // Channel/Process Items Reveal
      gsap.utils.toArray(".process-item").forEach((item) => {
        gsap.fromTo(item,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%" }
          }
        );
      });

      // General Fade Up for other sections
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: el, start: "top 85%" }}
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isGsapReady]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020205] text-white overflow-hidden pt-24 pb-20">
      
      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2e0505] via-[#050505] to-black z-0 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.6'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-24 mt-12 md:mt-20">
            <div className="flex items-center gap-3 mb-6">
                 <div className="h-[1px] w-12 bg-red-500/50"></div>
                 <span className="text-red-400 uppercase tracking-[0.2em] text-sm font-semibold">{serviceData.subtitle}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
                {serviceData.title.split(" ").map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-4">
                        <span className="svc-title-char inline-block">{word}</span>
                    </span>
                ))}
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed border-l-2 border-zinc-800 pl-6 svc-title-char opacity-0 translate-y-4">
                {serviceData.description}
            </p>

            <div className="mt-8 pl-6 svc-title-char opacity-0 translate-y-4">
                <Link to="/LetsConnect">
                    <button className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)]">
                        <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10 group-hover:text-white flex items-center gap-2">
                            Start Your Project
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </span>
                    </button>
                </Link>
            </div>
        </div>

        {/* --- SECTION 1: MEASURABLE ACTIONS (Grid) --- */}
        <div className="mb-8">
             <h2 className="text-2xl font-bold text-white mb-8 fade-up pl-2 border-l-4 border-red-600">What is Performance Marketing?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {serviceData.measurableActions.map((action, i) => (
                <div key={i} className="feature-card group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                        <svg className="w-8 h-8 text-red-500 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                    </div>
                    <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">{action.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{action.desc}</p>
                </div>
            ))}
        </div>

        {/* --- SECTION 2: CHANNELS (Process Layout) --- */}
        <div className="process-container relative grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div className="hidden lg:block sticky top-32 h-fit">
                <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700 mb-6">Marketing <br/>Channels</h2>
                <p className="text-zinc-400 text-lg max-w-xs">High-intent platforms where we optimize every rupee.</p>
                <div className="mt-12">
                   <HashLink smooth to="/#contact">
                        <button className="px-8 py-3 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest font-bold">
                            Scale Now
                        </button>
                   </HashLink>
                </div>
            </div>

            <div className="relative pl-8 border-l border-zinc-800">
                <div className="process-line absolute left-[-1px] top-0 w-[2px] bg-red-500 shadow-[0_0_15px_#ef4444]"></div>
                <div className="flex flex-col gap-12 lg:gap-20">
                    {serviceData.channels.map((channel, i) => (
                        <div key={i} className="process-item relative">
                            <span className="absolute -left-[45px] top-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#020205] border border-red-500/50 text-red-400 text-xs font-bold">
                                {channel.number}
                            </span>
                            <h3 className="text-3xl font-bold text-white mb-2">{channel.title}</h3>
                            <p className="text-zinc-400">{channel.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- SECTION 3: INDUSTRIES (Marquee/Grid) --- */}
        <div className="mb-32">
             <h3 className="text-center text-3xl font-bold text-white mb-12 fade-up">Industries We Serve</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 {serviceData.industries.map((ind, i) => (
                     <div key={i} className="fade-up p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-red-500/30 transition-all hover:-translate-y-1">
                         <h4 className="text-lg font-bold text-red-400 mb-2">{ind.title}</h4>
                         <p className="text-zinc-500 text-xs leading-relaxed">{ind.desc}</p>
                     </div>
                 ))}
             </div>
        </div>

        {/* --- SECTION 4: BENEFITS & COMPARISON --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            
            {/* Benefits List */}
            <div className="fade-up">
                <h3 className="text-3xl font-bold mb-8">Why Choose <span className="text-red-500">Performance?</span></h3>
                <ul className="space-y-4">
                    {serviceData.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                             <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                 <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                             </div>
                             <span className="text-zinc-200 font-medium">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Comparison Table */}
            <div className="fade-up bg-zinc-900/40 p-6 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Traditional vs Performance</h3>
                <div className="space-y-6">
                    {serviceData.comparison.map((row, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 text-sm border-b border-white/5 pb-4 last:border-0">
                            <div className="col-span-12 font-bold text-zinc-500 uppercase tracking-wider text-xs mb-1">{row.aspect}</div>
                            <div className="col-span-6 text-zinc-400 pr-2 border-r border-white/10">
                                <span className="block text-xs text-zinc-600 mb-1">Traditional</span>
                                {row.traditional}
                            </div>
                            <div className="col-span-6 text-white pl-2">
                                <span className="block text-xs text-red-500 mb-1">Performance</span>
                                {row.performance}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- FINAL CTA --- */}
        <div className="text-center relative py-12 border-t border-white/5 fade-up">
             <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to stop guessing and start growing?</h2>
             <HashLink smooth to="/#contact">
                <button className="px-10 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
                    Get High ROI
                </button>
             </HashLink>
        </div>

      </div>
    </div>
  );
};

export default PerformanceMarketing;