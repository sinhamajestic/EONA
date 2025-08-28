import React, { useState } from 'react';
import './App.css';

// Landing Page Component
const SnapCastLanding = ({ onNavigate }) => {
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
                <div className="text-white font-semibold text-lg">SnapCast</div>
                <div 
                  className="text-white/80 hover:text-white cursor-pointer transition-colors"
                  onClick={() => onNavigate('create')}
                >
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
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Powered by Murf badge */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
            <span className="text-sm text-white/90">Powered By Murf</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            AI-Audio Made
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Simple. Shareable. Social.
          </h2>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8 max-w-2xl">
          <p className="text-gray-300 text-lg mb-2">Turn thoughts into shareable voice clips in seconds.</p>
          <p className="text-gray-400">AI-driven voices designed for the next generation of creators.</p>
        </div>

        {/* Get Started Button */}
        <div className="mb-16">
          <button 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => onNavigate('signup')}
          >
            Get Started
          </button>
        </div>

        {/* Why Choose Us Section */}
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-2">Why Choose Us</h3>
            <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature Cards */}
            {[
              {
                icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
                gradient: "from-purple-500 to-pink-500",
                title: "Instant Murf Voices",
                description: "Turn your text into engaging short-form audio using realistic AI voices."
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                gradient: "from-blue-500 to-cyan-500",
                title: "Remix In Seconds",
                description: "Turn your text into engaging short-form audio using realistic AI voices."
              },
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                gradient: "from-green-500 to-emerald-500",
                title: "Built For Virality",
                description: "Turn your text into engaging short-form audio using realistic AI voices."
              }
            ].map((feature, index) => (
              <section key={index} className="relative w-full h-[341px] bg-[#ffffff05] rounded-[31px] border border-solid border-[#9da3aed9] hover:bg-[#ffffff08] transition-all duration-300 group">
                <div className="flex flex-col items-center justify-center h-full px-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4 text-center">{feature.title}</h4>
                  <p className="font-normal text-[#fefefe] text-lg text-center leading-[24px] max-w-[300px]">
                    {feature.description}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

// Create Page Component
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
                  SnapCast
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

// SignUp Page Component
const SignUp = ({ onNavigate }) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Voice Design */}
      <div className="w-1/2 relative bg-gradient-radial from-gray-800 via-gray-900 to-black flex flex-col justify-center items-start pl-16">
        {/* Voice Text */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white tracking-wider">VOICE</h1>
        </div>
        
        {/* Waveform Animation */}
        <div className="flex items-end space-x-2 mb-16">
          {Array.from({length: 40}).map((_, i) => (
            <div
              key={i}
              className="w-2 rounded-full animate-bounce"
              style={{
                height: `${Math.random() * 80 + 20}px`,
                background: `linear-gradient(to top, 
                  ${i % 4 === 0 ? '#ff6b9d' : 
                    i % 4 === 1 ? '#a855f7' : 
                    i % 4 === 2 ? '#3b82f6' : '#06b6d4'}, 
                  ${i % 4 === 0 ? '#ff8fab' : 
                    i % 4 === 1 ? '#c084fc' : 
                    i % 4 === 2 ? '#60a5fa' : '#22d3ee'})`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Bottom Text */}
        <div className="text-2xl font-bold text-white">
          <span>JOIN THE NEXT WAVE OF </span>
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            CREATORS
          </span>
        </div>
      </div>

      {/* Right Side - White Panel with Form */}
      <div className="w-1/2 bg-white flex flex-col p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-light text-gray-800">CREATE ACCOUNT</h2>
          <button 
            className="text-gray-600 hover:text-gray-800 text-sm"
            onClick={() => onNavigate('landing')}
          >
            Back
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6 flex-1">
          {/* First Name and Second Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute top-0 left-4 bg-white px-2 text-gray-600 text-sm -mt-2">
                First Name
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-16 px-4 pt-4 pb-2 border border-black rounded-full text-gray-800 text-lg font-light bg-transparent outline-none focus:border-gray-600 transition-colors"
                placeholder="First Name"
              />
            </div>
            <div className="relative">
              <div className="absolute top-0 left-4 bg-white px-2 text-gray-600 text-sm -mt-2">
                Second Name
              </div>
              <input
                type="text"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                className="w-full h-16 px-4 pt-4 pb-2 border border-black rounded-full text-gray-800 text-lg font-light bg-transparent outline-none focus:border-gray-600 transition-colors"
                placeholder="Second Name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="absolute top-0 left-4 bg-white px-2 text-gray-600 text-sm -mt-2">
              Email
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-16 px-4 pt-4 pb-2 border border-black rounded-full text-gray-800 text-lg font-light bg-transparent outline-none focus:border-gray-600 transition-colors"
              placeholder="Email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute top-0 left-4 bg-white px-2 text-gray-600 text-sm -mt-2">
              Password
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-16 px-4 pt-4 pb-2 border border-black rounded-full text-gray-800 text-lg font-light bg-transparent outline-none focus:border-gray-600 transition-colors"
              placeholder="Password"
            />
          </div>

          {/* Create Account Button */}
          <button className="w-full h-16 bg-gray-800 text-white rounded-full text-lg font-light hover:bg-gray-900 transition-colors">
            Create Account
          </button>

          {/* Already have account */}
          <div className="text-center">
            <span className="text-gray-600">Already have an Account? </span>
            <a href="#" className="text-gray-800 underline">Sign in</a>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button className="w-full h-14 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
              Sign Up With Email
            </button>
            <button className="w-full h-14 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
              Sign Up With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Complete App Component with Navigation
function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === 'landing') {
    return <SnapCastLanding onNavigate={handleNavigation} />;
  } else if (currentPage === 'create') {
    return <CreatePage onNavigate={handleNavigation} />;
  } else if (currentPage === 'signup') {
    return <SignUp onNavigate={handleNavigation} />;
  }
  
  return null;
}

export default App;