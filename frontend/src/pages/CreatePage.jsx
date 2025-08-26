import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Mic, Play, Pause, Download, Upload, Wand2, 
  Volume2, VolumeX, Settings, Sparkles
} from 'lucide-react';
import { mockVoiceTypes, mockCategories, mockCreateResponse } from '../mock';

export const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    voice: '',
    category: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewWaveform] = useState([12, 8, 16, 20, 14, 18, 10, 22, 16, 12, 8, 14, 18, 16, 10, 24]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim()) && formData.tags.length < 5) {
        setFormData({
          ...formData,
          tags: [...formData.tags, currentTag.trim()]
        });
        setCurrentTag('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleGenerate = async () => {
    if (!formData.content.trim() || !formData.voice) {
      alert('Please provide content and select a voice');
      return;
    }

    setIsGenerating(true);
    
    // Mock generation process
    setTimeout(() => {
      setGeneratedAudio({
        url: 'mock_audio_url',
        duration: Math.floor(Math.random() * 30) + 10,
        waveform: Array.from({length: 24}, () => Math.floor(Math.random() * 20) + 8)
      });
      setIsGenerating(false);
    }, 3000);
  };

  const handlePublish = async () => {
    if (!generatedAudio) {
      alert('Please generate audio first');
      return;
    }

    // Mock publish
    setTimeout(() => {
      alert('SnapCast published successfully! (Mock response)');
      // Reset form
      setFormData({ title: '', content: '', voice: '', category: '', tags: [] });
      setGeneratedAudio(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="heading-large text-gray-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            Create Your SnapCast
          </h1>
          <p className="body-standard text-gray-600">
            Transform your ideas into engaging audio content with AI voices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="p-6 animate-slide-up delay-100">
              <h2 className="heading-medium text-gray-900 mb-4">Content Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Give your SnapCast a catchy title..."
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                    maxLength={100}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.title.length}/100 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <Textarea
                    name="content"
                    placeholder="Write the text you want to convert to audio. Keep it engaging and under 500 characters for best results..."
                    value={formData.content}
                    onChange={handleInputChange}
                    className="min-h-32 resize-none"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.content.length}/500 characters
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (up to 5)
                  </label>
                  <Input
                    type="text"
                    placeholder="Type a tag and press Enter..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleAddTag}
                    className="form-input"
                    disabled={formData.tags.length >= 5}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        #{tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Voice & Category Selection */}
            <Card className="p-6 animate-slide-up delay-200">
              <h2 className="heading-medium text-gray-900 mb-4">Voice & Style</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AI Voice
                  </label>
                  <Select value={formData.voice} onValueChange={(value) => setFormData({...formData, voice: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVoiceTypes.map((voice) => (
                        <SelectItem key={voice.id} value={voice.name}>
                          <div>
                            <div className="font-medium">{voice.name}</div>
                            <div className="text-xs text-gray-500">{voice.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Generate Section */}
            <Card className="p-6 animate-slide-up delay-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="heading-medium text-gray-900">Generate Audio</h2>
                {generatedAudio && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Audio Ready
                  </Badge>
                )}
              </div>

              {!generatedAudio ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Ready to bring your content to life with AI voice?
                  </p>
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !formData.content.trim() || !formData.voice}
                    className="btn-primary px-8"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Generate SnapCast
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Waveform Preview */}
                  <div className="flex items-center justify-center gap-1 h-16 bg-gray-100 rounded-lg p-4">
                    {generatedAudio.waveform.map((height, i) => (
                      <div 
                        key={i}
                        className={`rounded-full transition-all duration-200 ${
                          isPlaying 
                            ? 'bg-gradient-to-t from-purple-500 to-pink-500' 
                            : 'bg-gray-400'
                        }`}
                        style={{
                          width: '3px',
                          height: `${height}px`
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      {isPlaying ? (
                        <Pause size={20} className="text-white" fill="white" />
                      ) : (
                        <Play size={20} className="text-white" fill="white" />
                      )}
                    </Button>
                    <span className="text-sm text-gray-600">
                      Duration: {generatedAudio.duration}s
                    </span>
                  </div>

                  {/* Regenerate */}
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="btn-secondary mr-2"
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="btn-secondary"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card className="p-6 animate-slide-up delay-400">
              <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Title:</span>
                  <p className="font-medium text-gray-900">
                    {formData.title || 'Your SnapCast Title'}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Voice:</span>
                  <p className="text-gray-900">
                    {formData.voice || 'Select a voice'}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Category:</span>
                  <p className="text-gray-900">
                    {formData.category || 'Select category'}
                  </p>
                </div>

                {formData.tags.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-500">Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Publish */}
            <Card className="p-6 animate-slide-up delay-500">
              <h3 className="font-semibold text-gray-900 mb-4">Publish Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="public" defaultChecked />
                  <label htmlFor="public" className="text-sm text-gray-700">
                    Make public
                  </label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="comments" defaultChecked />
                  <label htmlFor="comments" className="text-sm text-gray-700">
                    Allow comments
                  </label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remixes" defaultChecked />
                  <label htmlFor="remixes" className="text-sm text-gray-700">
                    Allow remixes
                  </label>
                </div>
              </div>

              <Button 
                onClick={handlePublish}
                disabled={!generatedAudio}
                className="w-full mt-6 btn-primary"
              >
                <Upload className="w-4 h-4 mr-2" />
                Publish SnapCast
              </Button>
            </Card>

            {/* Tips */}
            <Card className="p-6 animate-slide-up delay-600">
              <h3 className="font-semibold text-gray-900 mb-4">💡 Pro Tips</h3>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Keep content under 60 seconds for best engagement</li>
                <li>• Use relevant tags to increase discoverability</li>
                <li>• Choose voice that matches your content tone</li>
                <li>• Add compelling titles with emojis</li>
                <li>• Engage with comments to build community</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};