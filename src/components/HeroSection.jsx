import React from 'react';

const NextGenAiHero = () => {
  // कस्टम ग्रेडिएंट रंग, जो मूल छवि से मिलता-जुलता है और थोड़ा टेक्सचर।
  const nextGenGradient = "radial-gradient(ellipse at 50% 10%, rgba(0, 191, 255, 0.25) 0%, transparent 80%)";
  const textureStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: '30px 30px',
    opacity: 0.05, // Adjust opacity for subtlety
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-gray-900 text-white"
      style={{
        backgroundColor: '#050711', // गहरा नीला/काला बैकग्राउंड
        backgroundImage: nextGenGradient,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* पृष्ठभूमि में अतिरिक्त "प्रीमियम" विज़ुअल इफ़ेक्ट्स 
          जो डार्क बैकग्राउंड को और भी ज़्यादा डायनामिक बनाते हैं।
      */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        {/* एक subtle star/dot pattern या नॉइज़ इफ़ेक्ट के लिए */}
        <div className="absolute inset-0 bg-repeat bg-[size:40px_40px] [background-image:radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)]"></div>
        {/* Gradient texture overlay */}
        <div className="absolute inset-0" style={textureStyle}></div>
      </div>

      {/* मुख्य सामग्री को केंद्र में रखने के लिए */}
      <div className="relative z-10 max-w-4xl text-center pt-20">
        
        {/* 'Welcome to NextGen.ai' टैग */}
        {/* <div className="mb-6 inline-flex items-center justify-center rounded-full bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 border border-blue-500/30 backdrop-blur-sm">
          Welcome to DSS
        </div> */}

        {/* मुख्य शीर्षक */}
        {/* <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tighter mb-4">
          Transform Your <br className="hidden sm:inline" /> */}
          
          {/* 'Marketing' शब्द पर प्रीमियम ग्रेडिएंट और अंडरलाइन इफ़ेक्ट */}
          {/* <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"> */}
            {/* Marketing */}
            {/* अंडरलाइन इफ़ेक्ट */}
            {/* <span className="absolute left-0 bottom-[-5px] w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></span> */}
          {/* </span> */}
          
          <br /> 
          {/* Strategy with the Power of AI */}
        {/* </h1> */}

        {/* उपशीर्षक / विवरण */}
        {/* <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Boost your campaign performance, increase ROI, and unlock data-driven insights with our advanced AI marketing solutions.
        </p> */}

        {/* Get Started बटन */}
        {/* <div className="mt-10">
          <button 
            className="px-10 py-3 text-lg font-bold rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300 shadow-xl shadow-blue-500/50"
          >
            Get Started
          </button>
        </div> */}

        {/* यदि आप नेविगेशन बार (Header) भी शामिल करना चाहते हैं */}
        {/* यह कोड केवल Hero Section के लिए है, 
            लेकिन आप इसे Nav Bar के साथ इंटीग्रेट कर सकते हैं।
        */}
      </div>
    </section>
  );
};

// NextGenAiHero.js को एक्सपोर्ट करें
export default NextGenAiHero;