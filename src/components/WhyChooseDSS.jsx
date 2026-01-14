import React, { useState } from 'react';
import { 
  TrendingUp, 
  Headphones, 
  Settings, 
  Layers, 
  Eye, 
  Award, 
  Users, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative p-6 bg-slate-900 border border-slate-800 rounded-2xl transition-all duration-300 hover:border-orange-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-orange-500 transition-colors duration-300`}>
          <Icon className={`w-6 h-6 ${isHovered ? 'text-white' : 'text-orange-500'} transition-colors duration-300`} />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed text-sm flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};

const WhyChooseDSS = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Data-Driven Growth",
      description: "Our digital marketing agency in Indore delivers sustainable growth through advanced strategies, targeted campaigns, and an analytics-first approach that drives real business goals."
    },
    {
      icon: Headphones,
      title: "24/7 Reliable Support",
      description: "Professional support and responsive communication are our core values. We support your business every step of the way with 24x7 guidance and a scrupulous execution process."
    },
    {
      icon: Settings,
      title: "Custom-Tailored Channels",
      description: "Every business receives personalized SEO, PPC, and social media strategies, helping creative brands stand out significantly in Indore's competitive market."
    },
    {
      icon: Layers,
      title: "360° Integrated Solutions",
      description: "We offer comprehensive integrated solutions for website development, content creation, and digital visibility, consolidating all your marketing needs on a single platform."
    },
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "We keep all campaign results, project updates, and pricing open, ensuring clients remain confident and informed at every stage of our partnership."
    },
    {
      icon: Award,
      title: "Industry-Leading Expertise",
      description: "With Indore's top talent and innovative strategies, we take our clients to new heights, delivering proven conversion results that define us as the best digital marketing company."
    },
    {
      icon: Users,
      title: "High Client Retention",
      description: "Our rigorous results-review service, regular updates, and dedication to customer success ensure our retention rate in Indore is consistently higher than the industry average."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Hero / Intro Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              #1 Digital Partner in Indore
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Why Choose <span className="text-blue-500">DSS</span> as Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Digital Partner?</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8">
              We collaborate closely with you, understanding your business goals and challenges to build a roadmap for digital dominance.
            </p>

         
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Map through the first 6 features normally */}
            {features.slice(0, 6).map((feature, index) => (
              <FeatureCard 
                key={index}
                {...feature}
              />
            ))}
            
            {/* Spanning Feature for the last item (Retention) or Call to Action card */}
            <div className="md:col-span-2 lg:col-span-3 lg:w-2/3 lg:mx-auto">
               <FeatureCard 
                {...features[6]}
              />
            </div>
          </div>
        </div>
      </section>

   

    </div>
  );
};

export default WhyChooseDSS;