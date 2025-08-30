import React, { useState } from "react";

const ComposeWithoutScriptPage = ({ onNavigate }) => {
  // Content Details State
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  // Voice & Style State
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  const voices = [
    "Natural Voice 1",
    "Natural Voice 2", 
    "Professional Voice",
    "Casual Voice",
    "Energetic Voice",
  ];

  const categories = [
    "Podcast",
    "Audiobook",
    "Advertisement", 
    "Tutorial",
    "Story",
  ];

  // Content Details Handlers
  const handleTitleChange = (e) => {
    if (e.target.value.length <= 100) {
      setTitle(e.target.value);
    }
  };

  const handleIdeaChange = (e) => {
    if (e.target.value.length <= 300) {
      setIdea(e.target.value);
    }
  };

  const handleGeneratedScriptChange = (e) => {
    if (e.target.value.length <= 500) {
      setGeneratedScript(e.target.value);
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && currentTag.trim() && tags.length < 5) {
      e.preventDefault();
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // Generate Script Handler
  const handleGenerateScript = () => {
    if (idea.trim()) {
      setIsGeneratingScript(true);
      // Simulate script generation
      setTimeout(() => {
        const sampleScript = `Welcome to this engaging piece about ${idea}. Let me share some insights that will captivate your audience. This content is designed to be both informative and entertaining, perfect for your chosen format. The AI has crafted this script to match your vision while ensuring it flows naturally and keeps listeners engaged throughout.`;
        setGeneratedScript(sampleScript);
        setIsGeneratingScript(false);
      }, 2000);
    }
  };

  // Generate Audio Handler
  const handleGenerateAudio = () => {
    if (title && generatedScript && selectedVoice && selectedCategory) {
      setIsGeneratingAudio(true);
      // Simulate generation process
      setTimeout(() => {
        setIsGeneratingAudio(false);
        alert("Audio generated successfully!");
      }, 3000);
    }
  };

  const AnimatedWaveform = ({ side }) => (
    <div className={`absolute top-20 ${side === 'left' ? 'left-10' : 'right-10'} opacity-20`}>
      <div className="flex items-end space-x-1">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full animate-pulse"
            style={{
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <AnimatedWaveform side="left" />
      <AnimatedWaveform side="right" />
      
      {/* Background Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>

      {/* Glass Navigation Bar */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-8 py-4">
        <div className="flex items-center space-x-12">
          <div className="text-white font-bold text-xl">VOICE</div>
          <div className="flex space-x-8">
            <button 
              className="text-white/70 hover:text-white transition-colors"
              onClick={() => onNavigate('landing')}
            >
              Voice
            </button>
            <button className="text-white bg-white/20 px-4 py-2 rounded-full">
              Create
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              Feed
            </button>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 px-8 max-w-7xl mx-auto">
        {/* COMPOSE Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-light text-white tracking-wider">
            COMPOSE
          </h1>
        </div>

        {/* Main Panels Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Left Panel - Content Details */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <h2 className="text-4xl font-light text-white mb-8">Content Details</h2>
            
            {/* Title Input */}
            <div className="mb-8">
              <label className="block text-white/80 text-xl font-light mb-2">Title</label>
              <div className="text-white/60 text-sm mb-2">{title.length}/100 characters</div>
              <div className="bg-white/10 backdrop-blur-sm border border-purple-400/50 rounded-full p-4">
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Give your voice a catchy title..."
                  className="w-full bg-transparent text-white text-xl font-light placeholder-white/70 focus:outline-none"
                />
              </div>
            </div>

            {/* Idea Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-xl font-light mb-2">Your Idea</label>
              <div className="text-white/60 text-sm mb-2">{idea.length}/300 characters</div>
              <div className="bg-white/10 backdrop-blur-sm border border-purple-400/50 rounded-3xl p-6">
                <textarea
                  value={idea}
                  onChange={handleIdeaChange}
                  placeholder="Describe your idea or topic. What do you want to talk about? Keep it brief and clear..."
                  className="w-full h-24 bg-transparent text-white text-xl font-light placeholder-white/70 resize-none focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Generate Script Button */}
            <div className="mb-6">
              <button
                onClick={handleGenerateScript}
                disabled={!idea.trim() || isGeneratingScript}
                className={`w-full py-3 px-6 rounded-full text-lg font-medium transition-all duration-300 ${
                  !idea.trim() || isGeneratingScript
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                }`}
              >
                {isGeneratingScript ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Script...</span>
                  </div>
                ) : (
                  'Generate Script'
                )}
              </button>
            </div>

            {/* Generated Script Display/Edit */}
            {generatedScript && (
              <div className="mb-8">
                <label className="block text-white/80 text-xl font-light mb-2">Generated Script (Editable)</label>
                <div className="text-white/60 text-sm mb-2">{generatedScript.length}/500 characters</div>
                <div className="bg-white/10 backdrop-blur-sm border border-green-400/50 rounded-3xl p-6">
                  <textarea
                    value={generatedScript}
                    onChange={handleGeneratedScriptChange}
                    placeholder="Your AI-generated script will appear here..."
                    className="w-full h-32 bg-transparent text-white text-xl font-light placeholder-white/70 resize-none focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Tags Input */}
            <div>
              <label className="block text-white/80 text-xl font-light mb-2">Tags (up to 5)</label>
              <div className="bg-white/10 backdrop-blur-sm border border-purple-400/50 rounded-full p-4">
                <div className="flex items-center flex-wrap gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Type a tag and press Enter..."
                    className="flex-1 min-w-0 bg-transparent text-white text-xl font-light placeholder-white/70 focus:outline-none"
                    disabled={tags.length >= 5}
                  />
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/70 text-white text-sm cursor-pointer hover:bg-purple-500/90 transition-colors"
                      onClick={() => removeTag(index)}
                    >
                      {tag} ×
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Voice & Style */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <h2 className="text-4xl font-light text-white mb-8">Voice & Style</h2>
            
            {/* AI Voice Selection */}
            <div className="mb-8">
              <label className="block text-white/80 text-xl font-light mb-4">AI Voice</label>
              <div className="bg-white/10 backdrop-blur-sm border border-purple-400/50 rounded-full p-4">
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full bg-transparent text-white text-xl font-light focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-gray-800 text-white">Select a voice</option>
                  {voices.map((voice, index) => (
                    <option key={index} value={voice} className="bg-gray-800 text-white">
                      {voice}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-12">
              <label className="block text-white/80 text-xl font-light mb-4">Category</label>
              <div className="bg-white/10 backdrop-blur-sm border border-purple-400/50 rounded-full p-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-white text-xl font-light focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-gray-800 text-white">Select category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category} className="bg-gray-800 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Audio Section */}
            <div className="bg-white/10 backdrop-blur-sm border border-purple-400/50 rounded-3xl p-6">
              <h3 className="text-2xl font-medium text-white mb-2">Generate Audio</h3>
              <p className="text-white/70 text-lg mb-6">
                Ready To Bring Your AI-Generated Content To Life?
              </p>
              
              <button
                onClick={handleGenerateAudio}
                disabled={!title || !generatedScript || !selectedVoice || !selectedCategory || isGeneratingAudio}
                className={`w-full py-4 px-8 rounded-full text-xl font-medium transition-all duration-300 ${
                  !title || !generatedScript || !selectedVoice || !selectedCategory || isGeneratingAudio
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
                }`}
              >
                {isGeneratingAudio ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Audio...</span>
                  </div>
                ) : (
                  'GENERATE'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/3 left-10 w-2 h-20 bg-gradient-to-b from-purple-500/30 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-16 w-2 h-16 bg-gradient-to-b from-blue-500/30 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-12 bg-gradient-to-b from-pink-500/30 to-transparent rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ComposeWithoutScriptPage;