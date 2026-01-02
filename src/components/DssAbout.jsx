import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Trophy, Target, Rocket, Loader2 } from "lucide-react";
import Globe from "react-globe.gl";

gsap.registerPlugin(ScrollTrigger);

// --- THEME COLORS ---
const THEME = {
  blue: "#0078f0",
  orange: "#ff9f20",
  black: "#000000" // Pure Black
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const globeContainerRef = useRef(null);
  const globeRef = useRef();
  
  // States
  const [globeDimensions, setGlobeDimensions] = useState({ width: 600, height: 600 });
  const [isGlobeReady, setIsGlobeReady] = useState(false); // To handle loading state

  // --- DATA MEMOIZATION (Performance Optimization) ---
  // Data ko useMemo me dala taaki har render pe calculation na ho
  const globeData = useMemo(() => {
    const HQ = { name: "Indore HQ", lat: 22.7196, lng: 75.8577, color: THEME.blue, size: 1.5 };
    
    const clients = [
      { name: "Mumbai", lat: 19.0760, lng: 72.8777, color: THEME.orange },
      { name: "Delhi", lat: 28.7041, lng: 77.1025, color: THEME.orange },
      { name: "Bangalore", lat: 12.9716, lng: 77.5946, color: THEME.orange },
      { name: "Dubai", lat: 25.2048, lng: 55.2708, color: THEME.orange },
      { name: "New York", lat: 40.7128, lng: -74.0060, color: THEME.orange },
      { name: "London", lat: 51.5074, lng: -0.1278, color: THEME.orange },
      { name: "Sydney", lat: -33.8688, lng: 151.2093, color: THEME.orange },
    ];

    const arcs = clients.map(loc => ({
      startLat: HQ.lat,
      startLng: HQ.lng,
      endLat: loc.lat,
      endLng: loc.lng,
      color: [HQ.color, loc.color]
    }));

    return { points: [HQ, ...clients], arcs, rings: [HQ, ...clients] };
  }, []);

  useEffect(() => {
    // 1. Resize Handler
    const handleResize = () => {
      if (globeContainerRef.current) {
        setGlobeDimensions({
          width: globeContainerRef.current.offsetWidth,
          height: globeContainerRef.current.offsetHeight
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // 2. GSAP Animations
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(".anim-heading", 
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      // Cards
      gsap.fromTo(".content-card", 
        { y: 40, opacity: 0 }, 
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power1.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 95%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- HANDLE GLOBE READY ---
  const handleGlobeReady = () => {
    setIsGlobeReady(true);
    
    // Auto-rotate setup
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.6;
      // Set initial Viewpoint to focus on India/Asia
      globeRef.current.pointOfView({ lat: 20, lng: 77, altitude: 1.8 }); 
    }
    
    // Reveal Animation specifically for globe
    gsap.fromTo(globeRef.current, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 bg-black text-white overflow-hidden"
    >
      {/* Background Ambience (Using new Theme Colors) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0078f0]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff9f20]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          
          {/* LEFT: Heading */}
          <div className="anim-heading opacity-0 relative z-20">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-opacity-10 text-xs font-bold uppercase tracking-widest mb-6"
              style={{ borderColor: `${THEME.orange}40`, backgroundColor: `${THEME.orange}10`, color: THEME.orange }}
            >
              <MapPin size={12} />
              Global Reach
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
              Connecting Brands <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                Across The Globe
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-lg leading-relaxed border-l-2 pl-6" style={{ borderColor: THEME.blue }}>
              From our hub in Indore, we deliver digital excellence to clients worldwide. Interact with the globe to see our network.
            </p>
          </div>

          {/* RIGHT: 3D Globe (Bigger & Optimized) */}
          <div 
            ref={globeContainerRef}
            // Increased height to h-[600px] md:h-[700px] for bigger impact
            className="globe-container relative h-[500px] md:h-[600px] w-full flex items-center justify-center"
          >
             {/* LOADING SPINNER (Shows until globe is ready) */}
             {!isGlobeReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <Loader2 className="animate-spin text-blue-500 mb-2" size={32} />
                    <span className="text-xs text-gray-500 tracking-widest uppercase">Loading 3D Map...</span>
                </div>
             )}

             {/* GLOBE */}
             <div className={`transition-opacity duration-1000 ${isGlobeReady ? 'opacity-100' : 'opacity-0'}`}>
                <Globe
                    ref={globeRef}
                    width={globeDimensions.width}
                    height={globeDimensions.height}
                    backgroundColor="rgba(0,0,0,0)"
                    onGlobeReady={handleGlobeReady} // Detect when ready
                    
                    // Visuals
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    atmosphereColor={THEME.blue}
                    atmosphereAltitude={0.2}
                    
                    // Points
                    pointsData={globeData.points}
                    pointColor="color"
                    pointAltitude={0.01}
                    pointRadius={(d) => d.name === "Indore HQ" ? 0.8 : 0.5} // Make HQ bigger

                    // Rings
                    ringsData={globeData.rings}
                    ringColor="color"
                    ringMaxRadius={5}
                    ringPropagationSpeed={2}
                    ringRepeatPeriod={800}

                    // Arcs
                    arcsData={globeData.arcs}
                    arcColor="color"
                    arcDashLength={0.4}
                    arcDashGap={0.2}
                    arcDashAnimateTime={1200}
                    arcStroke={0.6}
                />
             </div>
          </div>
        </div>

        {/* CARDS */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="content-card opacity-0 p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-[#0078f0]/50 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-[#0078f0]/10 flex items-center justify-center text-[#0078f0] mb-6">
                <Trophy size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Global Standards</h3>
            <p className="text-sm text-gray-400 leading-7">
              Delivering international quality work from India. 7+ years of experience spans across industries.
            </p>
          </div>

          {/* Card 2 */}
          <div className="content-card opacity-0 p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-[#ff9f20]/50 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-[#ff9f20]/10 flex items-center justify-center text-[#ff9f20] mb-6">
                <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Targeted Reach</h3>
            <p className="text-sm text-gray-400 leading-7">
              We pinpoint your audience with laser focus. Whether local or global, we ensure maximum ROI.
            </p>
          </div>

          {/* Card 3 */}
          <div className="content-card opacity-0 p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-[#0078f0]/50 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-12 h-12 rounded-lg bg-[#0078f0]/10 flex items-center justify-center text-[#0078f0] mb-6">
                <Rocket size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Scalable Growth</h3>
            <p className="text-sm text-gray-400 leading-7">
              From startups to enterprises, we build strategies that scale. Connecting you to the future.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}