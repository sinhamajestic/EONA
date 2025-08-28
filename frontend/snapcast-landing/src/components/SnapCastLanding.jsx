import React from 'react';

const SnapCastLanding = ({ onNavigateToCreate }) => {
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
                  onClick={() => onNavigateToCreate && onNavigateToCreate()}
                >Creation</div>
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
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
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
            {/* Feature Card 1 - Instant Murf Voices */}
            <section className="relative w-full h-[341px] bg-[#ffffff05] rounded-[31px] border border-solid border-[#9da3aed9] hover:bg-[#ffffff08] transition-all duration-300 group" role="banner">
              <div className="flex flex-col items-center justify-center h-full px-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-4 text-center">Instant Murf Voices</h4>
                <p className="font-normal text-[#fefefe] text-lg text-center leading-[24px] max-w-[300px]">
                  Turn your text into engaging short-form audio using realistic AI voices.
                </p>
              </div>
            </section>

            {/* Feature Card 2 - Remix In Seconds */}
            <section className="relative w-full h-[341px] bg-[#ffffff05] rounded-[31px] border border-solid border-[#9da3aed9] hover:bg-[#ffffff08] transition-all duration-300 group" role="banner">
              <div className="flex flex-col items-center justify-center h-full px-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-4 text-center">Remix In Seconds</h4>
                <p className="font-normal text-[#fefefe] text-lg text-center leading-[24px] max-w-[300px]">
                  Turn your text into engaging short-form audio using realistic AI voices.
                </p>
              </div>
            </section>

            {/* Feature Card 3 - Built For Virality */}
            <section className="relative w-full h-[341px] bg-[#ffffff05] rounded-[31px] border border-solid border-[#9da3aed9] hover:bg-[#ffffff08] transition-all duration-300 group" role="banner">
              <div className="flex flex-col items-center justify-center h-full px-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-4 text-center">Built For Virality</h4>
                <p className="font-normal text-[#fefefe] text-lg text-center leading-[24px] max-w-[300px]">
                  Turn your text into engaging short-form audio using realistic AI voices.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Footer Section */}
      <footer className="relative z-20 mt-32">
        {/* Audio waveform visualization on the left */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <div className="flex items-end space-x-1 opacity-40">
            {Array.from({length: 15}).map((_, i) => (
              <div 
                key={i}
                className="w-1 bg-gradient-to-t from-purple-500 to-blue-400 animate-pulse"
                style={{
                  height: `${Math.random() * 150 + 30}px`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${1.5 + Math.random()}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Voice Amplified by AI.
            </h2>
            <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-300 text-lg mb-2">
                Join the new wave of creators making viral audio with SnapCast.
              </p>
              <p className="text-gray-400">
                Transform your ideas into engaging voice content in seconds.
              </p>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
            {/* SnapCast Column */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">SC</span>
                </div>
                <span className="text-white font-semibold">SnapCast</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Build AI voice, Create posts, and share engaging AI-powered voice content.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-3 mt-6">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.335 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.056 0C5.44 0 .007 5.433.007 12.056c0 5.32 3.474 9.832 8.279 11.425.605-.111.823-.262.823-.582 0-.286-.01-1.04-.016-2.04-3.34.724-4.043-1.608-4.043-1.608-.548-1.39-1.338-1.76-1.338-1.76-1.094-.748.082-.733.082-.733 1.209.085 1.845 1.241 1.845 1.241 1.075 1.842 2.82 1.31 3.507 1.002.108-.779.42-1.31.763-1.61-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.24-3.221-.125-.303-.539-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.487 11.487 0 0112.056 5.865c1.018.005 2.042.137 3 .402 2.291-1.552 3.297-1.23 3.297-1.23.659 1.652.244 2.873.12 3.176.773.84 1.237 1.911 1.237 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.814 1.103.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.695.825.578C20.565 21.832 24.049 17.319 24.049 12.056 24.049 5.433 18.616.001 12.056.001z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Voices</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            {/* Community Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Creator Program</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Videos</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Settings</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">© 2024 SnapCast. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SnapCastLanding;