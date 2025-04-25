import React, { useState } from 'react';
import { PlatformSelector } from './components/PlatformSelector';
import { WritingStyleSelector } from './components/WritingStyleSelector';
import { CaptionInput } from './components/CaptionInput';
import { CaptionCard } from './components/CaptionCard';
import { GenerateButton } from './components/Button';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateCaption } from './services/geminiService';
import { PLATFORMS, WRITING_STYLES } from './lib/constants';
import CaptionGenerator from './components/CaptionGenerator';

function App() {
  const [platform, setPlatform] = useState(PLATFORMS[2]); // LinkedIn default
  const [topic, setTopic] = useState('Course Completion');
  const [writingStyle, setWritingStyle] = useState(WRITING_STYLES[0]); // Professional default
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateCaption = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for your caption');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const captionTexts = await generateCaption({
        platform,
        topic,
        writingStyle
      });
      
      const newCaptions = captionTexts.map(text => ({
        text,
        platform,
        topic,
        style: writingStyle,
        timestamp: Date.now()
      }));
      
      setCaptions([...newCaptions, ...captions]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate captions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Caption Generator
            </h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select a Platform..
                </label>
                <PlatformSelector 
                  selectedPlatform={platform} 
                  onChange={setPlatform} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tell us the Topic/Details of the Post..
                </label>
                <CaptionInput 
                  value={topic} 
                  onChange={setTopic} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Writing Style
                </label>
                <WritingStyleSelector 
                  selectedStyle={writingStyle} 
                  onChange={setWritingStyle} 
                />
              </div>
              
              {error && (
                <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <GenerateButton 
                onClick={handleGenerateCaption} 
                loading={loading}
                className="w-full"
                size="lg"
              />
            </div>
          </div>
          
          {/* Output Section */}
          <div className="space-y-6">
            {loading ? (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Generating your perfect captions...</p>
              </div>
            ) : captions.length > 0 ? (
              captions.map((caption, index) => (
                <CaptionCard key={`${caption.timestamp}-${index}`} caption={caption} />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  No captions generated yet
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Select a platform, enter a topic, and click "Inspire Me" to generate your first captions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
