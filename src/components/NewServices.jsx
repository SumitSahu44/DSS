import React, { useEffect, useRef, useState } from 'react';
import { Globe, Megaphone, Share2, Search, PenTool, ShoppingBag, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Website Development",
    desc: "Professional website solutions designed to help your business grow. From modern designs to fully functional platforms, we build what your brand needs.",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    features: ["Static & Dynamic Websites", "WordPress, Shopify, MERN", "SSL, Hosting, Speed Opt", "Admin Panel Development", "E-commerce Store Setup", "Fully Responsive + SEO"]
  },
  {
    title: "Digital Marketing (PPC)",
    desc: "Powerful PPC campaigns designed to bring you real, measurable growth. We optimize every campaign for maximum clicks, conversions, and ROI.",
    icon: Megaphone,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "group-hover:border-orange-500/50",
    features: ["Facebook & Instagram Ads", "Google Ads (Search/Display)", "Lead Generation", "Sales Funnels", "Audience Targeting", "Retargeting & Scaling"]
  },
  {
    title: "Social Media Management",
    desc: "Professional social media solutions to grow your brand and engage your audience. We amplify your presence across platforms with creative content.",
    icon: Share2,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "group-hover:border-pink-500/50",
    features: ["12–15 Posts per month", "Reels & Motion Graphics", "Creative Storytelling", "Brand Consistency", "Page Optimization", "Monthly Analytics"]
  },
  {
    title: "SEO Optimization",
    desc: "Improve your website’s visibility and rankings. Our strategies drive organic traffic, boost credibility, and deliver long-term growth.",
    icon: Search,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "group-hover:border-green-500/50",
    features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Backlink Building", "Local SEO", "Ranking Reports"]
  },
  {
    title: "Branding & Design",
    desc: "Crafting designs that define your brand’s identity. From logos to complete brand systems, we create visuals that strengthen recognition.",
    icon: PenTool,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50",
    features: ["Logo Design", "Packaging Design", "Catalogues & Brochures", "Visiting Cards", "Social Media Kit", "Brand Guidelines"]
  },
  {
    title: "E-commerce Setup",
    desc: "Seamless solutions to launch and grow your online store. We provide everything to create a smooth, engaging, and profitable shopping experience.",
    icon: ShoppingBag,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "group-hover:border-yellow-500/50",
    features: ["Shopify Store Setup", "Payment Gateway Integration", "Delivery Partner Setup", "Product Listing", "Conversion Optimization", "Inventory Management"]
  },
  {
    title: "Local Business Growth",
    desc: "Strategies designed to boost your local presence. We create tailored plans that help your business attract more local customers.",
    icon: MapPin,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "group-hover:border-red-500/50",
    features: ["GMB Profile Setup", "Local SEO", "Review Management", "Local Ads", "Reputation Building", "Location Growth Plans"]
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // --- SAFE GSAP LOADING ---
  // Direct import fails in some environments, so we inject via CDN
  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) {
          setIsGsapReady(true);
          return;
        }

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        if (!window.gsap) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        if (!window.ScrollTrigger) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        
        setIsGsapReady(true);
      } catch (error) {
        console.error("GSAP loading failed", error);
      }
    };

    loadGsap();
  }, []);
  
  // --- ANIMATION LOGIC ---
  useEffect(() => {
    if (!isGsapReady || !containerRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered Fade In for cards
      gsap.from(".service-card", {
        y: 30, // Reduced distance for faster appearance
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%", // Trigger animation almost immediately when section appears
          toggleActions: "play none none none" // Play once and stay
        }
      });
      
      // Title Animation
      gsap.from(".section-header", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isGsapReady]);

  return (
    <section ref={containerRef} className="relative py-24 px-4 md:px-8 bg-[#050505] overflow-hidden" id="services">
      
      {/* Background Gradients */}
      <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="section-header text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Our Expertise
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                Solutions That Drive <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
                    Real Business Results
                </span>
            </h2>
            <p className="text-gray-400 text-lg">
                From crafting pixel-perfect websites to running ROI-driven campaigns, we provide end-to-end digital solutions tailored to your growth.
            </p>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
                const Icon = service.icon;
                // Last item (Local Business) spans full width on md, or centered on lg if you prefer layout adjustments.
                // Here we keep it standard grid for consistency, but styling makes it stand out.
                const isLast = i === services.length - 1;
                
                return (
                    <div 
                        key={i} 
                        className={`service-card group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden ${isLast ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
                    >
                        {/* Hover Border Glow */}
                        <div className={`absolute inset-0 border-2 border-transparent ${service.border} rounded-3xl transition-colors duration-500 pointer-events-none`} />
                        
                        {/* Icon Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform duration-500`}>
                                <Icon size={28} strokeWidth={2.5} />
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
                                <ArrowRight className="text-gray-500" size={20} />
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            {service.desc}
                        </p>

                        {/* Features List (Pills) */}
                        <div className="border-t border-white/5 pt-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                Includes
                                <div className="h-[1px] flex-1 bg-white/5" />
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {service.features.map((feature, idx) => (
                                    <span 
                                        key={idx} 
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 text-[11px] text-gray-300 border border-white/5 hover:border-white/20 transition-colors cursor-default"
                                    >
                                        <CheckCircle2 size={10} className={service.color} />
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                );
            })}
        </div>

      </div>
    </section>
  );
}