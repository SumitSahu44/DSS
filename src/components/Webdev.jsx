import React, { useEffect, useRef, useState } from "react";
import { 
  ShoppingCart, Database, Target, 
  UserCircle, Store, Palette, 
  Building2, Stethoscope, Briefcase, Utensils, 
  ArrowRight, Layers, TrendingUp, 
  Sparkles, Zap, Shield, Rocket, 
  Code, Server, Layout, Globe, 
  Check, ChevronRight, Star
} from "lucide-react";

// Animated Tech Icon Component
const TechIcon = ({ name, Icon, color, delay = 0 }) => (
  <div 
    className="group relative"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
    <div className="relative flex flex-col items-center gap-2 p-5 rounded-xl bg-[#0a1628]/60 backdrop-blur-md border border-blue-500/20 hover:border-cyan-400/40 hover:bg-[#0d1d35]/80 transition-all duration-500 w-28 h-28 justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20">
      <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-500`} strokeWidth={1.5} />
      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 group-hover:text-white transition-colors">{name}</span>
    </div>
  </div>
);

// Floating Particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 10}s`
        }}
      />
    ))}
  </div>
);

// Grid Background
const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30">
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,150,255,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,150,255,0.08) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />
  </div>
);

const serviceData = {
  hero: {
    title: "Website Development Company in Indore",
    subtitle: "Build a Powerful Online Presence",
    intro: "In today's digital age, a website isn't just an online brochure. A website is your business's digital showroom, sales executive, and brand identity. Customer impressions are formed through the website—and that impression determines whether a visitor converts into a lead or moves on to a competitor.",
    desc: "At Digital Success Solutions, we don't just design and develop websites, but also build e-commerce platforms that directly support sales and business growth. Our focus is on creating a website for each client that is user-friendly, fast, and conversion-optimized.",
    ctaText: "So you need a high-quality, fast, mobile-friendly, and conversion-optimized website."
  },

  types: [
    {
      title: "Business & Corporate Websites",
      desc: "Business and corporate websites are used to project a professional image for a company. They clearly display services, company profiles, and contact details. These websites help build brand trust and increase client inquiries.",
      icon: Building2,
      color: "text-blue-400"
    },
    {
      title: "E-Commerce Websites",
      desc: "E-commerce websites are designed to sell products or services online. They feature product listings, secure payment gateways, and a smooth checkout process. These websites help increase direct sales and scale businesses quickly.",
      icon: ShoppingCart,
      color: "text-cyan-400"
    },
    {
      title: "Dynamic Websites",
      desc: "Dynamic websites me content ko easily update aur manage kiya ja sakta hai. Ye websites growing businesses ke liye best hoti hain jahan regular changes aur updates ki zarurat hoti hai. Admin panel ke through content control simple aur fast hota hai.",
      icon: Database,
      color: "text-indigo-400"
    },
    {
      title: "Landing Pages",
      desc: "The main goal of landing pages is to generate conversions. These pages are used for ads, promotions, and lead generation campaigns. With high-converting designs and strong CTAs, they drive inquiries and sales.",
      icon: Target,
      color: "text-red-400"
    },
    {
      title: "Portfolio & Personal Websites",
      desc: "Portfolio and personal websites are ideal for professionals, freelancers, and creators. They showcase skills, work experience, and achievements. Such websites aid in personal branding and career growth.",
      icon: UserCircle,
      color: "text-purple-400"
    },
    {
      title: "Multi-Vendor Website Development",
      desc: "Multi-vendor websites allow multiple vendors to sell on a single platform. Vendor dashboards, commission systems, and order management features are often included. These marketplaces are the perfect solution for businesses.",
      icon: Store,
      color: "text-orange-400"
    },
    {
      title: "UI/UX Design",
      desc: "This phase creates a website visual design that is professional, modern, and brand-focused. Mobile users are given special priority.",
      icon: Palette,
      color: "text-pink-400"
    }
  ],

  strategySection: {
    title: "Boosting Online Sales with High-Converting E-Commerce Websites & Powerful UI/UX Design",
    part1: {
      heading: "Strategic Structure & Growth",
      text: "We have designed e-commerce and brand websites for many fashion and cosmetic brands where users get smooth browsing, attractive product presentation and easy checkout experience. The structure of these websites is planned in such a way that customers can easily explore the products and take purchase decisions quickly. This has helped the brands get strong growth in online sales along with organic traffic."
    },
    part2: {
      heading: "UI/UX & User Engagement",
      text: "Our expert website development team puts special focus on UI (User Interface) and UX (User Experience) in every project. A clean design, clear navigation and fast loading website engages the users. When the user finds it comfortable to use the website, they spend more time and the chances of conversion automatically increase. This is why we see higher engagement and better sales performance on our clients' websites."
    }
  },

  industries: [
    { name: "Real Estate Companies", icon: Building2 },
    { name: "Hospitals & Clinics", icon: Stethoscope },
    { name: "Doctors", icon: UserCircle },
    { name: "Fashion & Cosmetic Brands", icon: Store },
    { name: "Hotels & Restaurants", icon: Utensils },
    { name: "E-commerce Business", icon: ShoppingCart },
    { name: "Service Provider", icon: Briefcase }
  ],

  benefits: [
    { title: "Strong Online Presence", text: "A professional website strengthens your business online. Makes brand visible on Google & social media.", icon: Globe },
    { title: "Higher Trust and Credibility", text: "Consistent branding increases credibility. Customers trust brands that appear professional.", icon: Shield },
    { title: "More Leads and Inquiries", text: "Conversion-optimized website with clear CTAs consistently increases enquiries.", icon: TrendingUp },
    { title: "Better User Experience", text: "Fast loading & mobile-friendliness keeps visitors longer and reduces bounce rate.", icon: Sparkles },
    { title: "SEO and Ads Friendly", text: "SEO-ready structure makes website ideal for Google rankings and better Ad ROI.", icon: Rocket },
    { title: "Scalable Growth", text: "Scalable for future growth. New pages, features, and tools can be easily added.", icon: Layers },
    { title: "Long-Term ROI", text: "Generates consistent leads over the long term, reducing marketing costs.", icon: Zap }
  ],

  techStack: [
    { name: "React", Icon: Code, color: "text-cyan-400" },
    { name: "Next.js", Icon: Layout, color: "text-white" },
    { name: "Node.js", Icon: Server, color: "text-green-500" },
    { name: "MongoDB", Icon: Database, color: "text-green-400" },
    { name: "WordPress", Icon: Globe, color: "text-blue-500" },
    { name: "Shopify", Icon: ShoppingCart, color: "text-cyan-400" }
  ]
};

const WebDevAgency = () => {
  const containerRef = useRef(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) { setIsGsapReady(true); return; }
        const loadScript = (src) => new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
          const script = document.createElement("script");
          script.src = src; script.async = true; script.onload = resolve; script.onerror = reject;
          document.body.appendChild(script);
        });
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
        setIsGsapReady(true);
      } catch (error) { console.error("GSAP loading failed", error); }
    };
    loadGsap();
  }, []);

  useEffect(() => {
    if (!isGsapReady || !containerRef.current) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-animate", 
        { y: 80, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.2, duration: 1.4, ease: "power4.out" }
      );

      gsap.fromTo(".strategy-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 1.2, scrollTrigger: { trigger: ".strategy-section", start: "top 70%" }}
      );
      
      ScrollTrigger.batch(".animate-card", {
        start: "top 80%",
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.15, overwrite: true, duration: 0.9, ease: "power3.out" })
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [isGsapReady]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050b18] text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-25px) translateX(15px); opacity: 0.7; }
        }
        .animate-float { animation: float linear infinite; }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scan-line { animation: scan 8s linear infinite; }
      `}</style>

      {/* Futuristic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingParticles />
        <GridBackground />
        
        {/* Radial Glows */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-gradient-radial from-blue-600/30 via-cyan-500/20 to-transparent blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px]" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020716] via-[#061a3a]/80 to-[#050b18]" />
        
        {/* Scan Line Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="scan-line absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20">
        
        {/* Hero Section */}
        <div className="min-h-[85vh] flex flex-col justify-center mb-32">
          <div className="hero-animate inline-flex items-center gap-3 mb-8 group">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full animate-pulse" />
              <div className="relative px-5 py-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 backdrop-blur-md flex items-center gap-2">
                <Star size={14} className="text-cyan-400 fill-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Premium Web Solutions</span>
              </div>
            </div>
          </div>
          
          <h1 className="hero-animate text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
            <span className="text-white">Website Development</span><br/>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">Company in Indore</span>
          </h1>
          
          <div className="hero-animate max-w-3xl space-y-6 mb-10">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {serviceData.hero.intro}
            </p>
            
            <p className="text-base text-gray-400 leading-relaxed border-l-2 border-cyan-500/50 pl-6">
              {serviceData.hero.desc}
            </p>
          </div>

          <div className="hero-animate flex flex-wrap gap-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-3 hover:gap-4 hover:scale-105">
              Get Your Free Quote 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group px-8 py-4 border-2 border-cyan-500/30 text-cyan-300 font-bold text-sm rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300 flex items-center gap-3">
              View Our Work
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16">What We Build</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceData.types.map((type, i) => (
              <div key={i} className="animate-card opacity-0 translate-y-8 group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-7 rounded-2xl bg-[#0a1628]/70 backdrop-blur-md border border-blue-500/20 hover:bg-[#0d1d35]/90 hover:border-cyan-400/40 transition-all duration-500 h-full flex flex-col hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/20">
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#0d1d35] to-[#0a1628] border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-500 group-hover:scale-110">
                      <type.icon className={type.color} size={26} strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{type.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{type.desc}</p>
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <span className="text-xs text-cyan-400 font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Section */}
        <div className="strategy-section mb-40 relative">
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-cyan-400 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <TrendingUp size={22} />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">Strategy & Design</span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
              {serviceData.strategySection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="strategy-card group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative p-10 rounded-2xl bg-gradient-to-br from-[#0d1d35]/90 to-[#0a1628]/70 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-900/30 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20">
                    <Store className="text-blue-400" size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-5 group-hover:text-blue-400 transition-colors">
                    {serviceData.strategySection.part1.heading}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {serviceData.strategySection.part1.text}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex gap-2">
                  <span className="px-3 py-1.5 bg-blue-500/10 rounded-md text-xs text-blue-400 uppercase tracking-wider border border-blue-500/20 hover:bg-blue-500/20 transition-all">Conversion</span>
                  <span className="px-3 py-1.5 bg-blue-500/10 rounded-md text-xs text-blue-400 uppercase tracking-wider border border-blue-500/20 hover:bg-blue-500/20 transition-all">Growth</span>
                </div>
              </div>
            </div>

            <div className="strategy-card group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative p-10 rounded-2xl bg-gradient-to-br from-[#0d1d35]/90 to-[#0a1628]/70 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-600/30 to-cyan-900/30 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500 border border-cyan-500/20">
                    <Layers className="text-cyan-400" size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-5 group-hover:text-cyan-400 transition-colors">
                    {serviceData.strategySection.part2.heading}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {serviceData.strategySection.part2.text}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex gap-2">
                  <span className="px-3 py-1.5 bg-cyan-500/10 rounded-md text-xs text-cyan-400 uppercase tracking-wider border border-cyan-500/20 hover:bg-cyan-500/20 transition-all">Interface</span>
                  <span className="px-3 py-1.5 bg-cyan-500/10 rounded-md text-xs text-cyan-400 uppercase tracking-wider border border-cyan-500/20 hover:bg-cyan-500/20 transition-all">Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industries */}
        <div className="mb-40 pt-20 border-t border-white/5">
          <h2 className="text-3xl font-black mb-16 text-center">Industries We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceData.industries.map((ind, i) => (
              <div key={i} className="animate-card opacity-0 translate-y-4 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative px-6 py-3 rounded-full bg-[#0a1628]/70 backdrop-blur-md border border-blue-500/20 flex items-center gap-2.5 hover:border-cyan-400/40 hover:bg-[#0d1d35]/80 transition-all group-hover:scale-105">
                  <ind.icon className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={18} strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{ind.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40 items-start">
          <div className="animate-card sticky top-32">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold mb-4 block">The Advantage</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Why Choose Professional Web Design?
            </h2>
            <p className="text-gray-400 leading-relaxed text-base mb-10">
              A strong website generates consistent leads and sales over the long term. Once properly developed, it reduces marketing costs and increases organic reach.
            </p>
            <button className="group px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm rounded-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-3">
              Start Your Project
              <Rocket size={18} className="group-hover:translate-y-[-2px] transition-transform" />
            </button>
          </div>
          
          <div className="space-y-4">
            {serviceData.benefits.map((benefit, i) => (
              <div key={i} className="animate-card opacity-0 translate-y-4 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex gap-4 p-5 rounded-xl bg-[#0a1628]/60 backdrop-blur-md hover:bg-[#0d1d35]/80 transition-all border border-blue-500/20 hover:border-cyan-400/40 group-hover:scale-[1.02]">
                  <div className="mt-0.5 p-2.5 rounded-lg bg-gradient-to-br from-[#0d1d35] to-[#0a1628] border border-cyan-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                    <benefit.icon className="text-cyan-400" size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.text}</p>
                  </div>
                  <Check className="text-cyan-500/30 group-hover:text-cyan-500 transition-colors flex-shrink-0" size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="border-t border-white/5 pt-24">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-gray-600 font-bold mb-4 block">Our Arsenal</span>
            <h2 className="text-3xl font-black">Technologies We Master</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {serviceData.techStack.map((tech, i) => (
              <div key={i} className="animate-card opacity-0 translate-y-4">
                <TechIcon 
                  name={tech.name} 
                  Icon={tech.Icon} 
                  color={tech.color}
                  delay={i * 80}
                />
              </div>
            ))}
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default WebDevAgency;