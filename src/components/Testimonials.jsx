import React, { useEffect, useRef } from 'react';
import gsap from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';
import { Star, Quote, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Amit Verma",
    role: "Founder, TechGrow",
    content: "Digital Success Solutions transformed our online presence. Our leads increased by 200% in just 3 months. Truly the best in Indore!",
    rating: 5,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "Sneha Kapoor",
    role: "Marketing Head, Aura Fashion",
    content: "Their branding strategy gave us a completely new identity. The team is creative, responsive, and data-driven.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "Rahul Sharma",
    role: "CEO, Foodies Hub",
    content: "We needed a robust e-commerce platform, and they delivered beyond expectations. The UI is sleek and sales are booming.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "Priya Singh",
    role: "Director, EduSmart",
    content: "ROI-driven campaigns that actually work. They stopped our budget leakage and started generating real revenue.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "Vikram Malhotra",
    role: "Founder, BuildRight",
    content: "Professional, punctual, and innovative. They handle our SEO and Social Media effortlessly. Highly recommended!",
    rating: 4,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "Anjali Desai",
    role: "Co-Founder, GreenLife",
    content: "The best digital partner we've worked with. Their storytelling approach helped us connect with our audience on a deeper level.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
  }
];

const ReviewCard = ({ review }) => (
  <div className="w-[350px] md:w-[450px] p-6 md:p-8 mx-4 rounded-3xl bg-[#0a0a0a] border border-white/5 relative group hover:border-[#0078f0]/30 transition-colors duration-500">
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
    
    <div className="relative z-10 flex flex-col h-full">
      {/* Stars & Icon */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={`${i < review.rating ? 'fill-[#ff9f20] text-[#ff9f20]' : 'fill-gray-800 text-gray-800'}`} 
            />
          ))}
        </div>
        <Quote size={32} className="text-white/10 group-hover:text-[#0078f0]/20 transition-colors" />
      </div>

      {/* Content */}
      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 flex-1">
        "{review.content}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#0078f0] transition-colors">
          <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm">{review.name}</h4>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function TestimonialSection() {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Row 1 Animation (Left to Right)
      gsap.to(row1Ref.current, {
        xPercent: -50,
        repeat: -1,
        duration: 40, // Speed (Higher = Slower)
        ease: "linear",
      });

      // Row 2 Animation (Right to Left)
      gsap.fromTo(row2Ref.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 45, // Slightly different speed for natural feel
          ease: "linear",
        }
      );

      // Header Fade In
      gsap.from(".testimonial-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0078f0]/10 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* --- HEADER --- */}
      <div className="text-center mb-20 will-change-transform">
          <div className="flex items-center justify-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mb-6">
             <div className="w-12 h-[1px] bg-gray-700" />
             <span>Tetimonials</span>
             <div className="w-12 h-[1px] bg-gray-700" />
          </div>

          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none text-white mix-blend-exclusion">
             Trusted by<br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">Visionaries.</span>
          </h2>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-light">
          Don't just take our word for it. Here is what founders, CEOs, and market leaders say about building their legacy with us.
        </p>
        </div>
      


      {/* --- MARQUEE ROWS --- */}
      <div className="relative w-full">
        
        {/* Side Fade Gradients (To hide edges smoothly) */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex mb-8 w-max" ref={row1Ref}>
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`row1-${i}`} review={review} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-max" ref={row2Ref}>
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`row2-${i}`} review={review} />
          ))}
        </div>

      </div>

    </section>
  );
}