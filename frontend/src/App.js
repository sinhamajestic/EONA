import React, { useState } from 'react';
import './App.css';
import Composefromscript from './components/Composefromscript';
import ComposeWithoutScriptPage from './components/Composewithoutscript';

// Shared Navigation Component - Matches COMPOSE page design exactly
const SharedNavigation = ({ onNavigate, activePage }) => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-white/5 backdrop-blur-md rounded-2xl px-24 py-5 border border-white/10 shadow-lg w-full max-w-1xl">
        <div
          className="text-white font-medium text-3xl cursor-pointer hover:text-gray-300 transition-colors"
          onClick={() => onNavigate('landing')}
        >
          EONA
        </div>
        <div
          className={`font-medium text-3xl cursor-pointer transition-colors mx-64 ${
            activePage === 'create' 
              ? 'text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
          onClick={() => onNavigate('create')}
        >
          Create
        </div>
        
        <div className="text-gray-300 hover:text-white cursor-pointer transition-colors font-medium text-3xl">
          Feed
        </div>
        
        
      </div>
    </nav>
  );
};

// Shared Background Component
const SharedBackground = () => {
  return (
    <>
      {/* Background gradient - darker theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-black to-gray-900/40"></div>
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </>
  );
};

// Landing Page Component
const SnapCastLanding = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SharedBackground />
      <SharedNavigation onNavigate={onNavigate} activePage="landing" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pt-36">
        {/* Powered by Murf badge */}
        <div className="mb-8">
  <div className="relative inline-flex items-center">
    {/* Extended border lines */}
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-white/30 -translate-x-20"></div>
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-white/30 translate-x-20"></div>
    
    {/* Main badge */}
    <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/30">
      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
      <span className="text-sm text-white/90">Powered By Murf</span>
    </div>
  </div>
</div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-9xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
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

        {/* Get Started Button - Gray styling to match Figma */}
        <div className="mb-16">
          <button
            className="px-8 py-4 bg-gradient-to-r from-blue-300 to-purple-400 border border-white/20 rounded-full text-black font-semibold text-lg hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => onNavigate('signup')}
          >
            Get Started
          </button>
        </div>

        {/* Why Choose Us Section - Clean transparent container with connected border */}
        <div className="w-full max-w-6xl relative">
          {/* Container with transparent background and clean border */}
          <div className="rounded-3xl border border-white/30 p-8 relative">
            {/* "Why Choose Us" title positioned to connect with border */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-950/90 px-6 py-2 rounded-full border border-white/30">
                <h3 className="text-2xl font-semibold text-white">Why Choose Us</h3>
              </div>
            </div>
            
            {/* Gradient line under title */}
            <div className="flex justify-center mb-6 mt-8">
              <div className="w-24 h-0.1 bg-gradient-to-r from-purple-500 to-blue-400"></div>
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
                  description: "Pick a new voice, change emotion, and publish remixes with one click."
                },
                {
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                  gradient: "from-green-500 to-emerald-500",
                  title: "Built For Virality",
                  description: "Scroll, like, and share VOICE in a feed designed for discovery."
                }
              ].map((feature, index) => (
                <section key={index} className="relative w-full h-[250px] bg-[#ffffff05] rounded-[31px] border border-solid border-[#9da3aed9] hover:bg-[#ffffff08] transition-all duration-300 group">
                  <div className="flex flex-col items-center justify-start h-full px-6 pt-10 ">
                    
                    <h2 className="text-5xl font-semibold text-gray-300 mb-6 text-center">{feature.title}</h2>
                    <p className="font-normal text-[#fefefe] text-2xl text-center leading-[26px] max-w-[300px]">
                      {feature.description}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Page Component
const CreatePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SharedBackground />
      <SharedNavigation onNavigate={onNavigate} activePage="create" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-10 pt-40">

        {/* VOICE AI Title */}
        <div className="text-center mb-36">
          <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            EONA AI
          </h1>
        </div>

        {/* Two Cards Section */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full relative z-10" style={{marginTop: '-210px'}}>

          {/* Generate Voice With Script Card */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border-2 border-blue-400 p-12 hover:bg-white/8 transition-all duration-300 group min-h-[400px]">
            <div className="flex flex-col items-center text-center h-full">
              <h3 className="text-3xl font-light text-white mb-10 mt-6">
                GENERATE VOICE WITH<br />YOUR SCRIPT
              </h3>

              <div className="flex-1 mb-8">
                <p className="text-gray-300 text-lg mb-8">
                  Take Full Control Of Your Words.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 mt-14">
                  Upload Or Paste Your Own Script To Generate Exactly What You Want. Perfect If You Already Know What To Say.
                </p>
              </div>

              <button onClick={() => onNavigate('compose', true)} className="w-full-10 bg-gradient-to-r from-blue-200 to-purple-300 border border-white/20 rounded-full text-black font-semibold text-lg hover:bg-white/20 text-black px-6 py-3 rounded-full border border-white/30 transition-all duration-300 mt-8">
                UPLOAD  SCRIPT
              </button>
            </div>
          </div>

          {/* Generate Voice Without Script Card */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border-2 border-blue-400 p-12 hover:bg-white/8 transition-all duration-300 group min-h-[400px]">
            <div className="flex flex-col items-center text-center h-full">
              <h3 className="text-3xl font-light text-white mb-10 mt-6">
                GENERATE VOICE WITH<br />WITHOUT SCRIPT
              </h3>

              <div className="flex-1 mb-8">
                <p className="text-gray-300 text-lg mb-8">
                  No Script? No Problem.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 mt-14">
                  Let AI Craft A Natural, Engaging Script For You. Just Share Your Idea, And We'll Handle The Rest.
                </p>
              </div>

              <button onClick={() => onNavigate('compose', false)} className="w-full-10 bg-gradient-to-r from-blue-200 to-purple-300 border border-white/20 rounded-full text-black font-semibold text-lg hover:bg-white/20 text-black px-6 py-3 rounded-full border border-white/30 transition-all duration-300 mt-8">
                WITHOUT SCRIPT
              </button>
            </div>
          </div>

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
    <div className="w-full h-screen flex bg-gray-100">
      {/* Left Side - Dark with Radial Gradient */}
      <div className="w-1/2 h-full bg-black flex items-center justify-center relative">
        {/* Radial Gradient - Darker corners, lighter middle */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-800/40 via-pink-700/30 to-black"></div>
        <div className="absolute inset-0 bg-radial-gradient" style={{
          background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.3) 0%, rgba(219, 39, 119, 0.2) 30%, rgba(0, 0, 0, 0.9) 70%, rgba(0, 0, 0, 1) 100%)'
        }}></div>
        
        {/* Voice Title - Moved above waveform */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <h1 className="text-white text-9xl mr-64 mt-16 mb-0  font-bold text-left drop-shadow-2xl">Voice</h1>
        </div>
        
        {/* Waveform Animation - Centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex items-end space-x-2">
            <div className="w-4 h-32 bg-pink-400 rounded-t animate-bounce" style={{ animationDuration: '1s' }}></div>
            <div className="w-4 h-48 bg-purple-400 rounded-t animate-bounce" style={{ animationDuration: '1.2s', animationDelay: '0.1s' }}></div>
            <div className="w-5 h-64 bg-blue-400 rounded-t animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.2s' }}></div>
            <div className="w-6 h-72 bg-pink-300 rounded-t animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }}></div>
            <div className="w-5 h-56 bg-purple-300 rounded-t animate-bounce" style={{ animationDuration: '1.3s', animationDelay: '0.4s' }}></div>
            <div className="w-4 h-40 bg-blue-300 rounded-t animate-bounce" style={{ animationDuration: '1.1s', animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        {/* Text Content - Bottom left */}
        <div className="absolute left-28 bottom-32 z-10">
          <div className="text-white text-6xl font-bold leading-tight">
            <p>JOIN THE</p>
            <p>NEXT</p>
            <p>WAVE OF</p>
            <p className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">CREATORS.</p>
          </div>
        </div>
      </div>

      {/* Right Side - White Panel with Form */}
      <div className="w-3/4 bg-white flex flex-col p-12">
        {/* Header */}
        <div className="ml-28 mt-16 flex justify-between items-center mb-0">
          <h2 className="text-3xl font-light text-gray-800">CREATE ACCOUNT</h2>
          <button
            className="mr-36 mt-20 absolute top-8 right-8 text-gray-600 hover:text-gray-800 text-xl"
            onClick={() => onNavigate('landing')}
          >
            Back
          </button>
        </div>

        {/* Form */}
        <div className="ml-28 mr-28 mt-16 space-y-6 flex-1">
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
          <button className= "w-full h-[80px] bg-[#414143] rounded-[40px] border border-solid border-black text-white font-light text-2xl hover:bg-gray-700 transition-colors duration-200">
            Create Account
          </button>

          {/* Already have account */}
          <div className="text-center">
            <span className="text-gray-600 font-light text-lg">Already have an Account? </span>
            <a href="#" className="text-[#414143] hover:underline text-lg">Sign in</a>
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

// Compose page from script
const ComposePage = ({ onNavigate, script_flag }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SharedBackground />
      <SharedNavigation onNavigate={onNavigate} activePage="create" />
      
      <div className="relative z-20 pt-28 px-6">
        {script_flag ? <Composefromscript onNavigate={onNavigate} />
          :
          <ComposeWithoutScriptPage onNavigate={onNavigate} />}
      </div>
    </div>
  );
};

// Complete App Component with Navigation
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [flag, setflag] = useState(false);
  
  const handleNavigation = (page, flag) => {
    setCurrentPage(page);
    if (flag !== undefined) {
      setflag(flag);
    }
  };

  if (currentPage === 'landing') {
    return <SnapCastLanding onNavigate={handleNavigation} />;
  } else if (currentPage === 'create') {
    return <CreatePage onNavigate={handleNavigation} />;
  } else if (currentPage === 'signup') {
    return <SignUp onNavigate={handleNavigation} />;
  } else if (currentPage === 'compose') {
    return <ComposePage script_flag={flag} onNavigate={handleNavigation} />;
  }
  
  return null;
}

export default App;