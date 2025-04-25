import { useState } from 'react';
import { Sparkles, ChevronDown, Loader, Star, Heart, PartyPopper, Image, Music2 } from 'lucide-react';
// import { cn } from '@/lib/utils';

const CaptionGenerator = () => {
  const [platform, setPlatform] = useState('LinkedIn');
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState<([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const platforms = ['LinkedIn', 'Instagram', 'Twitter', 'Facebook'];
  const styles = ['Professional', 'Casual', 'Humorous', 'Formal'];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newCaption = `${platform} post about ${topic} in ${style.toLowerCase()} style: Proud moment at The Square Education! Our students have successfully completed the "Build Your Own AI Products" course. From learning to building real-world projects, they've grown incredibly. Here's to new skills, bold ideas, and a future full of innovation! 🚀`;
    
    setGeneratedCaptions([newCaption, ...generatedCaptions.slice(0, 2)]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] to-[#FFB6C1] p-6 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 group">
          <div className="p-8 bg-gradient-to-r from-[#FF69B4] to-[#FF1493]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-6 h-6 text-white animate-pulse" />
              <h1 className="text-4xl font-extrabold text-center text-white tracking-tight animate-fade-in">
                Caption Craft
              </h1>
              <Star className="w-6 h-6 text-white animate-pulse" />
            </div>
            <p className="text-center text-white/80 mb-6 text-lg flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" /> Generate captivating social media captions <Heart className="w-4 h-4" />
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Platform Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Image className="w-4 h-4 text-[#FF69B4]" />
                Select Platform
              </label>
              <div
                className="relative"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className={cn(
                  "w-full cursor-pointer bg-white border rounded-lg px-4 py-2.5 flex justify-between items-center",
                  "transition-all duration-300 hover:border-[#FF69B4] hover:ring-2 hover:ring-[#FF69B4]/20",
                  isDropdownOpen ? "border-[#FF69B4] ring-2 ring-[#FF69B4]/20" : "border-gray-300"
                )}>
                  <span className="text-gray-800">{platform}</span>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-gray-500 transition-transform duration-300",
                      isDropdownOpen ? "rotate-180" : ""
                    )} 
                  />
                </div>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fade-in">
                    {platforms.map((p) => (
                      <div
                        key={p}
                        className="px-4 py-2 cursor-pointer hover:bg-[#FF69B4]/10 transition-colors text-gray-700 hover:text-[#FF69B4]"
                        onClick={() => {
                          setPlatform(p);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Music2 className="w-4 h-4 text-[#FF69B4]" />
                Post Topic/Details
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:border-transparent transition-all duration-300 placeholder-gray-400"
                placeholder="Course completion, achievement, milestone..."
              />
            </div>

            {/* Style Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FF69B4]" />
                Writing Style
              </label>
              <div className="relative">
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none cursor-pointer hover:border-[#FF69B4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                >
                  {styles.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-[60%] h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
              className={cn(
                "w-full bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 font-medium",
                "transition-all duration-300 transform hover:scale-[1.02] group",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                "focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:ring-offset-2"
              )}
            >
              {isGenerating ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  <span>Crafting magic... ✨</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                  <span>Craft My Caption ✨</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Captions */}
        {generatedCaptions.length > 0 && (
          <div className="mt-8 space-y-4">
            {generatedCaptions.map((caption, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in border border-gray-100"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-[#FF69B4]/10 text-[#FF69B4] rounded-full text-sm flex items-center gap-1">
                    <Image className="w-3 h-3" /> {platform}
                  </span>
                  <span className="px-2 py-1 bg-[#FF1493]/10 text-[#FF1493] rounded-full text-sm flex items-center gap-1">
                    <Star className="w-3 h-3" /> {style}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{caption}</p>
                <div className="mt-4 flex justify-end">
                  <button className="text-[#FF69B4] hover:text-[#FF1493] transition-colors text-sm flex items-center gap-1">
                    <PartyPopper className="h-4 w-4" /> Copy Caption ✨
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptionGenerator;