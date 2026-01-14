import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Code2, Smartphone, Palette, Search, ShoppingBag, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Website Design & Development",
    desc: "High performance websites using MERN, Next.js & modern UI",
    icon: Code2,
    img: "/images/WeDeliver/4.png",
    link: "/website-design-and-website-development",
  },
  {
    id: "02",
    title: "Performance Marketing (PPC)",
    desc: "ROI focused Google Ads & Paid Campaigns",
    icon: Rocket,
    img: "/images/WeDeliver/3.png",
    link: "/performance-marketing-ppc",
  },
  {
    id: "03",
    title: "Social Media Marketing",
    desc: "Build brand presence & engagement on social platforms",
    icon: Smartphone,
    img: "/images/WeDeliver/2.png",
    link: "/social-media-marketing",
  },
  {
    id: "04",
    title: "Search Engine Optimization",
    desc: "Rank higher on Google with proven SEO strategies",
    icon: Search,
    img: "/images/WeDeliver/1.png",
    link: "/search-engine-optimization",
  },
  {
    id: "05",
    title: "Influencer Marketing",
    desc: "Influencer collaborations that drive trust & sales",
    icon: Palette,
    img: "/images/WeDeliver/5.png",
    link: "/influencer-marketing",
  },
  {
    id: "06",
    title: "E-Commerce Applications",
    desc: "Scalable Shopify & custom e-commerce solutions",
    icon: ShoppingBag,
    img: "/images/WeDeliver/6.png",
    link: "/e-commerce-applications",
  },
];

export default function ServicesScroll() {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Dynamic calculation: Total Width of track - Viewport Width
      // This ensures we scroll exactly to the end, no matter the screen size
      const getScrollAmount = () => {
        let trackWidth = sliderRef.current.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(sliderRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${sliderRef.current.scrollWidth - window.innerWidth}`, 
          invalidateOnRefresh: true, // Recalculates on resize (Mobile to Desktop switch)
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    // 1. Main Container (No overflow hidden here to allow sticky to work)
    <div ref={componentRef} className="bg-[#050505] relative w-full h-screen overflow-hidden flex flex-col">
      
      {/* 2. TOP SECTION: Title */}
      {/* Static Height, never overlaps */}
      <div className="w-full px-6 md:px-12 pt-10 pb-4 md:pt-12 shrink-0 z-20">
         <div className="flex items-center gap-3 mb-2">
            <div className="h-[2px] w-10 bg-blue-500"></div>
            <span className="text-blue-400 uppercase tracking-widest text-xs font-bold">Services</span>
         </div>
         <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight">
            We Provide the Best <br/> Digital Marketing Services in Indore
         </h2>
      </div>

      {/* 3. BOTTOM SECTION: The Slider Window */}
      {/* flex-grow fills the remaining height. overflow-hidden hides the horizontal scrollbar */}
      <div className="flex-grow w-full relative flex items-center overflow-hidden">
        
        {/* 4. THE TRACK: Moves Left */}
        {/* w-fit ensures it takes the width of all cards combined */}
        <div ref={sliderRef} className="flex gap-6 md:gap-12 px-6 md:px-12 w-fit h-[55vh] md:h-[60vh]">
            
            {/* Intro Text Block */}
            <div className="w-[80vw] md:w-[25vw] h-full flex-shrink-0 flex flex-col justify-center border-r border-white/10 pr-8">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                   Our expertise lies in building digital products that scale. <br/>
                   <span className="text-white font-bold mt-2 block">Swipe to explore &rarr;</span>
                </p>
            </div>

            {/* Cards Loop */}
            {services.map((service, index) => (
              <Link to={service.link}>
                <div 
                    key={index} 
                    className="relative w-[85vw] md:w-[30vw] h-full flex-shrink-0 group rounded-3xl overflow-hidden border border-white/10 bg-[#111]"
                >
                    {/* Image: No Grayscale, Full Color */}
                    <div className="absolute inset-0">
                        <img 
                            src={service.img} 
                            alt={service.title} 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Gradient Overlay for Text Readability Only */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                    </div>

                    {/* ID Number */}
                    <div className="absolute top-6 right-6 text-5xl font-black text-white/10 z-10">
                        {service.id}
                    </div>

                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20">
                        <div className="mb-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                             <service.icon size={22} />
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase">
                            {service.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-300 line-clamp-3">
                            {service.desc}
                        </p>
                    </div>
                </div>
                </Link>
            ))}
            
            {/* Spacer at the end to ensure last card isn't glued to the edge */}
            <div className="w-[5vw] flex-shrink-0" />
        </div>
      </div>
      
    </div>
  );
}