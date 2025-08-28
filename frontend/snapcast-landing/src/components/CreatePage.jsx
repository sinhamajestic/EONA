import React from 'react';

const CreatePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      
      {/* Audio waveform visualization on the left */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex items-end space-x-1 opacity-60">
          {Array.from({length: 20}).map((_, i) => (
            <div 
              key={i}
              className="w-1 bg-gradient-to-t from-purple-500 to-blue-400 animate-pulse"
              style={{
                height: `${Math.random() * 200 + 50}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Glass Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Navigation Links */}
              <div className="flex items-center space-x-12">
                <div 
                  className="text-white font-semibold text-lg cursor-pointer"
                  onClick={() => onNavigate && onNavigate('landing')}
                >
                  VOICE
                </div>
                <div className="bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm cursor-pointer">
                  Creation
                </div>
                <div className="text-white/80 hover:text-white cursor-pointer transition-colors">Feed</div>
              </div>
              
              {/* Hamburger Menu */}
              <div className="flex flex-col space-y-1 cursor-pointer">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        
        {/* VOICE AI Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            VOICE AI
          </h1>
        </div>

        {/* Two Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          
          {/* Generate Voice With Script Card */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 hover:bg-white/8 transition-all duration-300 group">
            <div className="flex flex-col items-center text-center h-full">
              <h3 className="text-xl font-semibold text-white mb-6">
                GENERATE VOICE WITH<br />YOUR SCRIPT
              </h3>
              
              <div className="flex-1 mb-8">
                <p className="text-gray-300 text-sm mb-4">
                  Take Full Control Of Your Words.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Upload Or Paste Your Own Script To Generate Exactly What You Want. Perfect If You Already Know What To Say.
                </p>
              </div>
              
              <button className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/30 transition-all duration-300">
                FROM SCRIPT
              </button>
            </div>
          </div>

          {/* Generate Voice Without Script Card */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 hover:bg-white/8 transition-all duration-300 group">
            <div className="flex flex-col items-center text-center h-full">
              <h3 className="text-xl font-semibold text-white mb-6">
                GENERATE VOICE WITH<br />WITHOUT SCRIPT
              </h3>
              
              <div className="flex-1 mb-8">
                <p className="text-gray-300 text-sm mb-4">
                  No Script? No Problem.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Let AI Craft A Natural, Engaging Script For You. Just Share Your Idea, And We'll Handle The Rest.
                </p>
              </div>
              
              <button className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/30 transition-all duration-300">
                WITHOUT SCRIPT
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Audio waveform visualization on the right */}
      <div className="absolute right-0 top-3/4 transform -translate-y-1/2">
        <div className="flex items-end space-x-1 opacity-40">
          {Array.from({length: 15}).map((_, i) => (
            <div 
              key={i}
              className="w-1 bg-gradient-to-t from-blue-500 to-purple-400 animate-pulse"
              style={{
                height: `${Math.random() * 150 + 30}px`,
                animationDelay: `${i * 0.12}s`,
                animationDuration: `${1.2 + Math.random()}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;