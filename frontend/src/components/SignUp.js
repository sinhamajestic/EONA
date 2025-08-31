import React, { useState } from 'react';

const SignUpPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

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
          <h1 className="text-white text-8xl font-bold text-center drop-shadow-2xl">Voice</h1>
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
        <div className="absolute left-12 bottom-32 z-10">
          <div className="text-white text-4xl font-bold leading-tight">
            <p>JOIN THE</p>
            <p>NEXT</p>
            <p>WAVE OF</p>
            <p className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">CREATORS.</p>
          </div>
        </div>
      </div>

      {/* Right Side - White Panel with Form */}
      <div className="w-1/2 h-full bg-white rounded-l-[70px] shadow-[-35px_0px_250px_4px_rgba(0,0,0,0.1)] relative">
        <div className="flex flex-col justify-center items-center h-full px-16">
          
          {/* Back Button */}
          <button className="absolute top-8 right-8 text-gray-600 hover:text-gray-800 text-lg">
            ← Back
          </button>
          
          {/* Create Account Header */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-800 tracking-wide">CREATE ACCOUNT</h2>
          </div>
          
          {/* Form Container */}
          <div className="w-full max-w-lg space-y-6">
            
            {/* First Name and Second Name Row */}
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <div className="relative h-[80px]">
                  <div className="absolute w-full h-[80px] rounded-[40px] border border-solid border-black" />
                  <div className="absolute w-[90px] h-4 top-[-8px] left-[20px] bg-white text-center">
                    <span className="text-xs text-gray-500 font-light">First Name</span>
                  </div>
                  <input
                    name="firstName"
                    className="absolute w-full top-0 left-0 h-[80px] px-6 font-light text-[#414143] text-lg tracking-[0] leading-[normal] bg-transparent border-none outline-none"
                    placeholder="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    aria-label="First Name"
                  />
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="relative h-[80px]">
                  <div className="absolute w-full h-[80px] rounded-[40px] border border-solid border-black" />
                  <div className="absolute w-[100px] h-4 top-[-8px] left-[20px] bg-white text-center">
                    <span className="text-xs text-gray-500 font-light">Second Name</span>
                  </div>
                  <input
                    name="secondName"
                    className="absolute w-full top-0 left-0 h-[80px] px-6 font-light text-[#414143] text-lg tracking-[0] leading-[normal] bg-transparent border-none outline-none"
                    placeholder="Second Name"
                    type="text"
                    value={formData.secondName}
                    onChange={handleInputChange}
                    aria-label="Second Name"
                  />
                </div>
              </div>
            </div>
            
            {/* Email Field */}
            <div className="relative">
              <div className="relative h-[80px]">
                <div className="absolute w-full h-[80px] rounded-[40px] border border-solid border-black" />
                <div className="absolute w-[50px] h-4 top-[-8px] left-[20px] bg-white text-center">
                  <span className="text-xs text-gray-500 font-light">Email</span>
                </div>
                <input
                  name="email"
                  className="absolute w-full top-0 left-0 h-[80px] px-6 font-light text-[#414143] text-lg tracking-[0] leading-[normal] bg-transparent border-none outline-none"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-label="Email address"
                  autoComplete="email"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="relative">
              <div className="relative h-[80px]">
                <div className="absolute w-full h-[80px] rounded-[40px] border border-solid border-black" />
                <div className="absolute w-[70px] h-4 top-[-8px] left-[20px] bg-white text-center">
                  <span className="text-xs text-gray-500 font-light">Password</span>
                </div>
                <input
                  name="password"
                  className="absolute w-full top-0 left-0 h-[80px] px-6 font-light text-[#414143] text-lg tracking-[0] leading-[normal] bg-transparent border-none outline-none"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  aria-label="Password"
                />
              </div>
            </div>
            
            {/* Create Account Button */}
            <button
              onClick={handleSubmit}
              className="w-full h-[80px] bg-[#414143] rounded-[40px] border border-solid border-black text-white font-light text-2xl hover:bg-gray-700 transition-colors duration-200"
            >
              Create Account
            </button>
            
          </div>
          
          {/* Already have account */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-light text-sm">
              Already have an Account? <a href="#" className="text-[#414143] hover:underline">Sign In</a>
            </p>
          </div>
          
          {/* OR Divider */}
          <div className="flex items-center my-6 w-full max-w-lg">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 font-light text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          {/* Social Login Buttons */}
          <div className="flex space-x-3 w-full max-w-lg">
            <button className="flex-1 h-[50px] rounded-[40px] border border-solid border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
              <span className="text-gray-700 font-light text-sm">📧 Sign Up With Email</span>
            </button>
            
            <button className="flex-1 h-[50px] rounded-[40px] border border-solid border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
              <span className="text-gray-700 font-light text-sm">🔍 Sign Up With Google</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;