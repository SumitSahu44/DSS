import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  MessageCircle, Target, Users, Share2, 
  TrendingUp, BarChart3, Zap, ArrowUpRight,
  Video, Calendar, Monitor, Heart, ShoppingBag, 
  Activity, CheckCircle2, Layers, Lightbulb
} from "lucide-react";

// --- HELPER COMPONENT (Defined First) ---
const CameraIcon = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

// --- CUSTOMIZED CONTENT (Full SMM Content Integrated) ---
const serviceData = {
  subtitle: "Build Brand Authority",
  title: "Social Media Marketing Services in Indore",
  intro: "In today's digital era, social media is not just a platform for engagement but has become a powerful tool for brand authority, customer trust and business growth. If you want to grow your business in Indore, then having a strong social media presence is very important.",
  description: "Digital Success Solution provides professional Social Media Marketing Services in Indore that makes brands strong and trustworthy online. We have successfully managed social media handles of many fashion, cosmetic, real estate, hospital, restaurant or service-based brands. Our focus is not just on increasing likes and followers but on creating meaningful engagement with the right audience. We create a custom social media strategy for every brand by understanding their business goals, target audience and competitors.",

  // SECTION 1: PLATFORM MANAGEMENT
  platforms: [
    {
      title: "Facebook Management",
      desc: "Facebook remains a powerful social media platform, with both older and younger generations active. Therefore, if Facebook marketing is done correctly, it can be a powerful medium for brand awareness, engagement, and lead generation. Digital Success Solution's professional Facebook Management services help brands connect effectively with their target audience.",
      icon: <Users className="text-blue-500" />,
      color: "blue"
    },
    {
      title: "Instagram Management",
      desc: "Instagram is the fastest-growing social media platform today, where visual content has become a key factor in brand success. Whether your business is fashion, cosmetic, restaurant, real estate, or service-based, proper Instagram management can increase brand visibility, engagement, and conversions multiple times.",
      icon: <CameraIcon className="text-pink-500" />,
      color: "pink"
    },
    {
      title: "LinkedIn Management",
      desc: "LinkedIn is a powerful professional networking platform where businesses, decision-makers, and industry leaders are active. If LinkedIn marketing is done with the right strategy, it can be an excellent platform for building brand authority, generating B2B leads, and strengthening professional credibility.",
      icon: <Target className="text-blue-400" />,
      color: "sky"
    },
    {
      title: "Twitter (X) Management",
      desc: "Twitter (now X) is a fast-paced social media platform where real-time updates, conversations, and trends are crucial for brand visibility. If Twitter is managed strategically, it can be a platform for brand voice.",
      icon: <MessageCircle className="text-white" />,
      color: "zinc"
    }
  ],

  // SECTION 2: CORE SERVICES
  services: [
    {
      title: "Social Page Optimization",
      desc: "Digital Success Solution provides professional Social Page Optimization services in which we optimize according to the rules and audience behavior of each social platform. In this, profile bio, description, username, profile photo, cover image, CTA buttons and page settings are strategically optimized so that the brand message is clear and impactful.",
      icon: <Monitor />
    },
    {
      title: "Content Scheduling",
      desc: "Digital Success Solution provides professional Content Scheduling services where we understand the brand's goals, target audience, and platform's algorithm to create a custom content calendar. This calendar schedules posts, reels, stories, and promotional content at the right time and frequency to maximize reach and engagement.",
      icon: <Calendar />
    },
    {
      title: "Brand Awareness",
      desc: "Brand awareness is the foundation of any business's long-term success. When people recognize and trust your brand, they choose your services or products. Building strong brand awareness is crucial in today's competitive digital environment, especially on social media platforms where audiences are active daily.",
      icon: <Lightbulb />
    },
    {
      title: "Low Cost Social Traffic",
      desc: "Digital Success Solutions provides professional, low-cost social traffic services that are customized to suit every business's budget. We use the perfect combination of organic strategies with paid campaigns to achieve maximum reach and engagement. Targeted audience selection, interest-based campaigns, and optimized ad placement ensure you get high-quality traffic with conversion potential.",
      icon: <TrendingUp />
    },
    {
      title: "Reels & Video Marketing",
      desc: "In today's digital era, video content, especially reels and short videos, has become the most powerful tool for audience engagement and brand visibility. Social media users now prefer more visual content, hence Reels & Video Marketing is the perfect medium for businesses to generate leads and conversions. We not only create the content but also plan the strategy, creative scripting, video editing and posting schedule.",
      icon: <Video />
    }
  ],

  // SECTION 3: INDUSTRIES SERVED
  industries: [
    {
      title: "Real Estate",
      desc: "Content marketing for real estate businesses involves creating property listings, blogs, and informative posts that attract potential buyers and investors. This improves lead generation and brand visibility.",
      icon: <Layers />
    },
    {
      title: "Fashion & Clothing",
      desc: "Designs trend-focused content, styling guides, and social media campaigns for fashion and clothing brands. These boost audience engagement and online sales.",
      icon: <ShoppingBag />
    },
    {
      title: "Hospitals & Clinics",
      desc: "Develops health blogs, patient awareness posts, and service highlights for hospitals and clinics. These build trust and credibility and help patients.",
      icon: <Activity />
    }
  ],

  // SECTION 4: WHY SMM IMPORTANT
  importance: [
    "In today's digital age, brand visibility means how often people see, recognize, and remember your brand. Social Media Marketing (SMM) is the most effective and affordable way to increase brand visibility.",
    "Building the trust of a local audience is crucial for any local business, and social media makes this process fast and effective. When people see businesses in their area online, their trust naturally builds.",
    "In today's digital age, Social Media Marketing (SMM) isn't just about likes and followers; it's become a powerful tool for increasing direct sales and conversions.",
    "When social media is used strategically, potential customers can be converted into actual buyers."
  ],

  // SECTION 5: CONTENT STRATEGY (The 7 Points)
  strategy: [
    { title: "Educational Posts", text: "Educational posts provide value to the audience and establish the brand as an expert. Simple tips, how-to guides, and problem-solving content build trust. When people learn, they remember the brand." },
    { title: "Reels & Short Videos", text: "Short videos grab attention quickly. Quick tips, trends, and relatable moments reach a wider audience. The magic of Reels is that the message becomes clear in a short time." },
    { title: "Testimonials", text: "Real customer stories authenticate a brand. People trust experiences more than ads. An honest review often sways a sales decision." },
    { title: "Case Studies", text: "Case studies show real results, not just promises. The journey from problem to solution is clearly explained. This is strong, convincing content for serious buyers." },
    { title: "Offers & Promotions", text: "Limited-time offers compel people to take action quickly. Discounts and deals attract both attention and conversions. Offers at the right time boost sales." },
    { title: "Behind-the-Scenes", text: "Showing real people behind the brand builds connection. Daily work, team moments, and efforts make the brand human. This content increases both trust and likeability." },
    { title: "Brand Storytelling", text: "The brand's journey connects emotionally with the audience. Struggles, vision, and growth stories make the brand memorable. When people feel the story, the brand is no longer just a business." }
  ]
};

const SocialMediaMarketing = () => {
  const containerRef = useRef(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

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

  useEffect(() => {
    if (!isGsapReady || !containerRef.current) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(".hero-text", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" }
      );

      // Card Animations (Generic for all grids)
      gsap.utils.toArray(".animate-card").forEach((card) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: card, start: "top 90%" } }
        );
      });

      // Strategy Line Animation
      gsap.fromTo(".strategy-line",
        { height: "0%" },
        { height: "100%", ease: "none", scrollTrigger: { trigger: ".strategy-container", start: "top center", end: "bottom center", scrub: 1 } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isGsapReady]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020205] text-white overflow-hidden pt-24 pb-20">
      
      {/* Background Ambient Tint */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2e0518] via-[#050505] to-black z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HERO SECTION --- */}
        <div className="mb-24 mt-12 md:mt-20">
            <div className="flex items-center gap-3 mb-6 hero-text">
                 <div className="h-[1px] w-12 bg-rose-500/50"></div>
                 <span className="text-rose-400 uppercase tracking-[0.2em] text-sm font-semibold">{serviceData.subtitle}</span>
            </div>
            
            <h1 className="hero-text text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
                {serviceData.title}
            </h1>
            
            <div className="hero-text flex flex-col md:flex-row gap-8 mb-10">
                <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-rose-500/20 pl-6">
                    {serviceData.intro}
                </p>
                <p className="text-zinc-400 text-base max-w-xl leading-relaxed">
                    {serviceData.description}
                </p>
            </div>

            <div className="hero-text">
                <Link to="/LetsConnect">
                    <button className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.4)]">
                        <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 group-hover:text-white flex items-center gap-2">
                            Start Growing Now <ArrowUpRight size={18} />
                        </span>
                    </button>
                </Link>
            </div>
        </div>

        {/* --- PLATFORMS SECTION --- */}
        <div className="mb-32">
            <h2 className="text-3xl font-bold mb-10 text-center"><span className="text-rose-500">Platforms</span> We Manage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceData.platforms.map((platform, i) => (
                    <div key={i} className="animate-card group p-6 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-rose-500/30 transition-all duration-300 hover:-translate-y-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-white/5 group-hover:bg-rose-500/20 transition-colors`}>
                            {platform.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{platform.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{platform.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- CORE SERVICES SECTION --- */}
        <div className="mb-32">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <h2 className="text-4xl md:text-5xl font-black uppercase text-white">Our Core <br/><span className="text-rose-500">Services</span></h2>
                <p className="text-zinc-400 max-w-md text-sm mt-4 md:mt-0">
                    Comprehensive solutions tailored for the Indore market to maximize your digital footprint.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceData.services.map((service, i) => (
                    <div key={i} className="animate-card p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/60 transition-all duration-500 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-rose-600/10 rounded-xl text-rose-500 group-hover:text-white group-hover:bg-rose-500 transition-all">
                                {service.icon}
                            </div>
                            <div className="text-zinc-700 font-black text-4xl opacity-20">0{i+1}</div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- WHY SMM IS IMPORTANT & INDUSTRIES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* Left: Why Important */}
            <div className="animate-card">
                <h3 className="text-rose-400 font-bold tracking-widest uppercase text-sm mb-4">Why It Matters</h3>
                <h2 className="text-3xl font-bold text-white mb-8">Why Social Media Marketing Is Important?</h2>
                <ul className="space-y-6">
                    {serviceData.importance.map((point, i) => (
                        <li key={i} className="flex gap-4">
                            <CheckCircle2 className="text-rose-500 shrink-0 mt-1" size={20} />
                            <p className="text-zinc-300 text-sm leading-relaxed">{point}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right: Industries */}
            <div className="animate-card">
                <h3 className="text-rose-400 font-bold tracking-widest uppercase text-sm mb-4">Sectors</h3>
                <h2 className="text-3xl font-bold text-white mb-8">Industries We Serve</h2>
                <div className="space-y-4">
                    {serviceData.industries.map((ind, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-rose-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-rose-500">{ind.icon}</span>
                                <h4 className="text-xl font-bold text-white">{ind.title}</h4>
                            </div>
                            <p className="text-zinc-400 text-sm pl-9">{ind.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- CONTENT STRATEGY (Timeline Style) --- */}
        <div className="strategy-container relative mb-20">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-white/10 uppercase mb-4">Content <br/> Strategy</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">We use a mix of these 7 powerful content types to ensure your brand stays relevant and engaging.</p>
            </div>

            <div className="relative max-w-3xl mx-auto pl-8 border-l border-zinc-800">
                <div className="strategy-line absolute left-[-1px] top-0 w-[2px] bg-rose-500 shadow-[0_0_15px_#f43f5e]"></div>
                
                <div className="flex flex-col gap-12">
                    {serviceData.strategy.map((item, i) => (
                        <div key={i} className="animate-card relative pl-8">
                            <span className="absolute -left-[45px] top-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#020205] border border-rose-500/50 text-rose-400 text-xs font-bold">
                                {i + 1}
                            </span>
                            <div className="p-6 bg-zinc-900/30 rounded-2xl border border-white/5 hover:border-rose-500/20 transition-all">
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-zinc-400 text-sm">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- BOTTOM CTA --- */}
        {/* <div className="text-center py-20 border-t border-white/5">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to dominate <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">Social Media?</span></h2>
            <Link to="/LetsConnect">
                <button className="px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full transition-all shadow-[0_0_40px_-10px_rgba(225,29,72,0.5)]">
                    Get a Custom Strategy
                </button>
            </Link>
        </div> */}

      </div>
    </div>
  );
};

export default SocialMediaMarketing;