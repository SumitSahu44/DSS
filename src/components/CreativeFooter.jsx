import React, { useRef } from "react"; 
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons Import
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";

export default function Footer() {
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to navigate to sections (works from any page)
  const goToSection = (hash) => {
    if (location.pathname !== "/") {
      const hashValue = hash.startsWith('#') ? hash.substring(1) : hash;
      navigate({ pathname: "/", hash: hashValue }, { replace: false });
    } else {
      window.history.pushState(null, "", hash);
      const scrollToElement = (attempt = 0) => {
        const el = document.querySelector(hash);
        if (el) {
          const rect = el.getBoundingClientRect();
          const isRendered = rect.height > 0 || el.offsetHeight > 0;
          
          if (isRendered) {
            const offsetTop = el.offsetTop - 100;
            window.scrollTo({
              top: Math.max(0, offsetTop),
              behavior: "smooth"
            });
          } else if (attempt < 5) {
            setTimeout(() => scrollToElement(attempt + 1), 200);
          }
        } else if (attempt < 5) {
          setTimeout(() => scrollToElement(attempt + 1), 200);
        }
      };
      scrollToElement();
    }
  };

  // --- SOCIAL MEDIA LINKS ---
  const socialLinks = [
    { 
      icon: <FaLinkedinIn size={14} />, 
      href: "https://www.linkedin.com/company/digital-success-solutions-dss/", 
      label: "LinkedIn" 
    },
    { 
      icon: <FaInstagram size={16} />, 
      href: "https://www.instagram.com/digitalsuccess_solutions/", 
      label: "Instagram" 
    },
    { 
      icon: <FaFacebookF size={14} />, 
      href: "https://www.facebook.com/p/Digital-Success-Solutions-61567317789854/", 
      label: "Facebook" 
    },
  ];

  return (
    <footer 
      ref={footerRef}
      // UPDATE: Padding reduced (pt-20 -> pt-12, pb-10 -> pb-6) to make it compact
      className="relative bg-[#050505] text-white pt-12 pb-6 overflow-hidden font-sans border-t border-white/5"
    >
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
         
         {/* Gradient Mesh */}
         <div className="absolute bottom-0 left-[-20%] w-[40vw] h-[40vw] bg-[#0078f0]/5 rounded-full blur-[100px]" />
         <div className="absolute top-0 right-[-20%] w-[40vw] h-[40vw] bg-[#ff9f20]/5 rounded-full blur-[100px]" />

         {/* BACKGROUND TEXT - Scaled down slightly */}
         <div className="absolute bottom-0 left-0 w-full text-center pointer-events-none select-none overflow-hidden">
            <h1 className="text-[12vw] font-black text-white/[0.03] leading-none tracking-tighter">
               DSS
            </h1>
         </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- 1. CALL TO ACTION (Compact Version) --- */}
        {/* UPDATE: Margin reduced (mb-16 -> mb-10) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-10 border-b border-white/10">
          <div className="max-w-xl">
            {/* UPDATE: Text sizes reduced slightly */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4">
               READY TO <br/>
               <span className="text-[#0078f0]">SCALE</span> <span className="text-[#ff9f20]">UP?</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light max-w-sm leading-relaxed">
               Let's build something that defines your industry. Schedule a call today.
            </p>
          </div>
           
           {/* CTA Button */}
           <Link to="/LetsConnect" className="group relative mt-6 md:mt-0 inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs overflow-hidden rounded-full transition-transform hover:scale-105">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Project</span>
              <div className="absolute inset-0 bg-[#0078f0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
           </Link>
        </div>

        {/* --- 2. MAIN GRID LINKS (The Layout Fix) --- */}
        {/* UPDATE: grid-cols-2 (Mobile) and lg:grid-cols-4 (Laptop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 mb-10">
           
           {/* Column 1: Brand Info */}
           <div className="col-span-1 flex flex-col gap-4">
              <div className="text-xl font-black tracking-tighter uppercase">
                 DSS<span className="text-[#0078f0]">.</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[180px]">
                 Digital Success Solutions. Crafting world-class digital experiences.
              </p>
              
              <div className="mt-1 text-gray-400 text-xs leading-relaxed">
                <p className="font-bold text-white mb-1 uppercase tracking-wider text-[10px]">Indore HQ</p>
                <p>Scheme No 53, Vijay Nagar,</p>
                <p>Indore, MP – 452010</p>
              </div>
           </div>

           {/* Column 2: Explore */}
           <div className="col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Explore</h4>
              <ul className="flex flex-col gap-2 text-gray-400 text-xs md:text-sm">
                <li><Link to="/" className="hover:text-[#ff9f20] transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-[#ff9f20] transition-colors">Who We Are</Link></li>
                <li><Link to="/PortfolioPage" className="hover:text-[#ff9f20] transition-colors">Portfolio</Link></li>
                <li><Link to="/Blogs" className="hover:text-[#ff9f20] transition-colors">Blogs</Link></li>
                <li><Link to="/LetsConnect" className="hover:text-[#ff9f20] transition-colors">Lets Talk</Link></li>
              </ul>
           </div>

           {/* Column 3: Services */}
           <div className="col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Services</h4>
              <ul className="flex flex-col gap-2 text-gray-400 text-xs md:text-sm">
                <li><Link to="/website-design-and-website-development" className="hover:text-[#0078f0] transition-colors">Web Development</Link></li>
                <li><Link to="/performance-marketing-ppc" className="hover:text-[#0078f0] transition-colors">Performance Marketing</Link></li>
                <li><Link to="/social-media-marketing" className="hover:text-[#0078f0] transition-colors">Social Media</Link></li>
                <li><Link to="/search-engine-optimization" className="hover:text-[#0078f0] transition-colors">SEO</Link></li>
                <li><Link to="/influencer-marketing" className="hover:text-[#0078f0] transition-colors">Influencer Marketing</Link></li>
              </ul>
           </div>

           {/* Column 4: Contact & Socials */}
           <div className="col-span-1 flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Connect</h4>
              
              {/* Emails - Compact */}
              <div className="flex flex-col gap-1 mb-4 text-xs md:text-sm">
                  <a href="mailto:Info@digitalsuccesssolutions.in" className="text-gray-400 hover:text-[#0078f0] break-all">
                    Info@digitalsuccesssolutions.in
                  </a>
                  <a href="mailto:business@digitalsuccesssolutions.in" className="text-gray-400 hover:text-[#0078f0] break-all">
                    business@digitalsuccesssolutions.in
                  </a>
              </div>

              {/* Phones - Compact */}
              <div className="flex flex-col gap-1 mb-5 text-xs  md:text-sm">
                <a href="tel:+916264398990" className="text-white hover:text-[#ff9f20] font-mono">
                    +91 62643 98990
                </a>
                <a href="tel:+918718980114" className="text-white hover:text-[#ff9f20] font-mono">
                    +91 87189 80114
                </a>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <a 
                        key={i} 
                        href={social.href}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0078f0] hover:border-[#0078f0] transition-all duration-300"
                    >
                        {social.icon}
                    </a>
                  ))}
              </div>
           </div>

        </div>

        {/* --- 3. BOTTOM BAR (Compact) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 text-[10px] text-gray-600 font-mono uppercase tracking-wider gap-3 md:gap-0">
           <div className="text-center md:text-left">
             © 2025 DSS LLP. All Rights Reserved.
           </div>
           
           <div className="flex flex-wrap justify-center gap-4 md:gap-6">
             <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
             <Link to="/TermsAndConditions" className="hover:text-white transition-colors">Terms</Link>
             <a href="https://www.digitalsuccesssolutions.in" className="hover:text-[#0078f0] transition-colors">
               digitalsuccesssolutions.in
             </a>
           </div>
        </div>

      </div>
    </footer>
  );
}