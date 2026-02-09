
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Layout, 
  Wand2, 
  Download, 
  Save, 
  Play, 
  Loader2, 
  MessageSquare,
  Key,
  Lock,
  Zap
} from 'lucide-react';
import { generateAdImage, generateAdVideo, generateAdCopy } from '../services/gemini';
import { User, AIAsset } from '../types';

interface AIAdStudioProps {
  user: User;
}

const AIAdStudio: React.FC<AIAdStudioProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'canvas'>('image');
  const [assets, setAssets] = useState<AIAsset[]>([]);
  
  // Usage State (Mocked for session)
  const [usage, setUsage] = useState({ images: 0, videos: 0 });

  // Tier Limits Logic
  const getLimits = () => {
     // Override for non-student roles to ensure they can demo the feature
     if (['admin', 'trainer', 'enterprise_admin', 'consultant'].includes(user.role)) {
        return { images: 100, videos: 20, label: 'Partner Access' };
     }
     
     switch (user.tier) {
        case 'elite': return { images: 30, videos: 5, label: 'Elite Tier' };
        case 'pro': return { images: 10, videos: 0, label: 'Pro Tier' };
        default: return { images: 0, videos: 0, label: 'Free Tier' };
     }
  };

  const limits = getLimits();
  
  // Image Lab State
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStyle, setImageStyle] = useState('Photorealistic');
  const [imageLoading, setImageLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Video Lab State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [hasPaidKey, setHasPaidKey] = useState(false);

  // Canvas State
  const [canvasProduct, setCanvasProduct] = useState('');
  const [canvasGoal, setCanvasGoal] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState<any[]>([]);
  const [copyLoading, setCopyLoading] = useState(false);

  useEffect(() => {
    // Check for Veo API key availability
    const checkKey = async () => {
      if ((window as any).aistudio) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setHasPaidKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if ((window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      setHasPaidKey(hasKey);
    } else {
      alert("Veo API Key selector not available in this environment.");
    }
  };

  const handleGenerateImage = async () => {
    if (usage.images >= limits.images) {
       alert(`You have reached your monthly limit of ${limits.images} images. Upgrade to Elite for more.`);
       return;
    }
    if (!imagePrompt) return;
    
    setImageLoading(true);
    setGeneratedImage(null);
    const result = await generateAdImage(imagePrompt, imageStyle);
    if (result) {
      setGeneratedImage(result);
      setAssets(prev => [{ id: Date.now().toString(), type: 'image', url: result, prompt: imagePrompt, createdAt: new Date().toISOString() }, ...prev]);
      setUsage(prev => ({ ...prev, images: prev.images + 1 }));
    } else {
      alert("Image generation failed.");
    }
    setImageLoading(false);
  };

  const handleGenerateVideo = async () => {
    if (limits.videos === 0) {
       alert("Video generation is available on the Elite tier. Please upgrade to access Motion Lab.");
       return;
    }
    if (usage.videos >= limits.videos) {
       alert(`You have reached your monthly limit of ${limits.videos} videos.`);
       return;
    }
    if (!videoPrompt) return;
    
    setVideoLoading(true);
    setGeneratedVideo(null);
    
    // Safety check for key (though handled by Veo function implicitly if env key exists, the prompt requires the paid key flow)
    if (!hasPaidKey && (window as any).aistudio) {
       await handleSelectKey();
    }

    const result = await generateAdVideo(videoPrompt);
    if (result) {
      setGeneratedVideo(result);
      setAssets(prev => [{ id: Date.now().toString(), type: 'video', url: result, prompt: videoPrompt, createdAt: new Date().toISOString() }, ...prev]);
      setUsage(prev => ({ ...prev, videos: prev.videos + 1 }));
    } else {
      alert("Video generation failed. Ensure you have a paid API key selected for Veo.");
    }
    setVideoLoading(false);
  };

  const handleGenerateCopy = async () => {
    if (!canvasProduct || !canvasGoal) return;
    setCopyLoading(true);
    const result = await generateAdCopy(canvasProduct, canvasGoal);
    if (result) {
      setGeneratedCopy(result);
    }
    setCopyLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* Studio Header */}
      <div className="border-b border-gray-800 bg-[#0a0a0a] p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">AI Ad Studio</h1>
            <div className="flex items-center gap-2 text-xs text-gray-400">
               <span className="text-white font-medium">{limits.label}</span>
               <span>•</span>
               <span className={`${usage.images >= limits.images ? 'text-red-500' : 'text-gray-400'}`}>
                  IMG: {usage.images}/{limits.images}
               </span>
               <span>•</span>
               <span className={`${usage.videos >= limits.videos ? 'text-red-500' : 'text-gray-400'}`}>
                  VID: {usage.videos}/{limits.videos}
               </span>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-900 rounded-lg p-1">
          {['image', 'video', 'canvas'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab === 'image' && <ImageIcon className="w-4 h-4" />}
              {tab === 'video' && <VideoIcon className="w-4 h-4" />}
              {tab === 'canvas' && <Layout className="w-4 h-4" />}
              <span className="capitalize">{tab} Lab</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* IMAGE LAB */}
        {activeTab === 'image' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-gray-200 mb-4 flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-purple-400" /> Prompt Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image Description</label>
                    <textarea 
                      className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm text-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[120px]"
                      placeholder="e.g. A sleek, modern office desk with a laptop displaying financial charts, cinematic lighting, photorealistic..."
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Style Preset</label>
                    <select 
                      className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm text-gray-200"
                      value={imageStyle}
                      onChange={(e) => setImageStyle(e.target.value)}
                    >
                      <option>Photorealistic</option>
                      <option>Cinematic</option>
                      <option>Neon / Cyberpunk</option>
                      <option>Corporate Minimalist</option>
                      <option>3D Render</option>
                    </select>
                  </div>
                  
                  {limits.images > 0 ? (
                     <button 
                       onClick={handleGenerateImage}
                       disabled={imageLoading || !imagePrompt || usage.images >= limits.images}
                       className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {imageLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                       {usage.images >= limits.images ? 'Monthly Limit Reached' : 'Generate Asset'}
                     </button>
                  ) : (
                     <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 text-center">
                        <Lock className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Upgrade to Pro to generate images.</p>
                     </div>
                  )}
                  
                  <p className="text-[10px] text-center text-gray-500">
                     {limits.images - usage.images} credits remaining this month.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                 <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Recent Assets</p>
                 <div className="grid grid-cols-3 gap-2">
                    {assets.filter(a => a.type === 'image').map(asset => (
                       <img key={asset.id} src={asset.url} className="w-full h-20 object-cover rounded border border-gray-700 cursor-pointer hover:border-white" onClick={() => setGeneratedImage(asset.url || null)} />
                    ))}
                 </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-black border border-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden min-h-[500px]">
               {generatedImage ? (
                  <div className="relative w-full h-full flex flex-col">
                     <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                     <div className="absolute bottom-4 right-4 flex gap-2">
                        <a href={generatedImage} download="ad_asset.png" className="bg-black/80 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-gray-700">
                           <Download className="w-4 h-4" /> Download
                        </a>
                     </div>
                  </div>
               ) : (
                  <div className="text-center text-gray-600">
                     <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                     <p>Generated visuals will appear here.</p>
                  </div>
               )}
            </div>
          </div>
        )}

        {/* MOTION LAB (Veo) */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-gray-200 flex items-center gap-2">
                     <VideoIcon className="w-4 h-4 text-blue-400" /> Motion Config
                   </h3>
                   {!hasPaidKey && (
                      <button onClick={handleSelectKey} className="text-[10px] bg-yellow-900 text-yellow-200 px-2 py-1 rounded border border-yellow-700 flex items-center gap-1">
                         <Key className="w-3 h-3" /> Set Key
                      </button>
                   )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Scene Description</label>
                    <textarea 
                      className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[120px]"
                      placeholder="e.g. A neon hologram of a cat driving at top speed, cyberpunk style..."
                      value={videoPrompt}
                      onChange={(e) => setVideoPrompt(e.target.value)}
                    />
                  </div>
                  <div className="p-3 bg-blue-900/20 border border-blue-900/50 rounded-lg text-xs text-blue-200">
                     <strong>Powered by Veo:</strong> Generates 1080p, 16:9 videos. Requires a paid API key.
                  </div>
                  
                  {limits.videos > 0 ? (
                     <button 
                       onClick={handleGenerateVideo}
                       disabled={videoLoading || !videoPrompt || usage.videos >= limits.videos}
                       className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {videoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                       {usage.videos >= limits.videos ? 'Monthly Limit Reached' : 'Generate Video'}
                     </button>
                  ) : (
                     <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 text-center">
                        <Lock className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Upgrade to Elite to unlock Veo Motion Lab.</p>
                     </div>
                  )}
                  
                  {limits.videos > 0 && (
                     <p className="text-[10px] text-center text-gray-500">
                        {limits.videos - usage.videos} video credits remaining this month.
                     </p>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-black border border-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden min-h-[500px]">
               {videoLoading ? (
                  <div className="text-center">
                     <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                     <p className="text-gray-400 text-sm">Rendering video... This may take a minute.</p>
                  </div>
               ) : generatedVideo ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                     <video controls className="max-w-full max-h-full rounded-lg shadow-2xl" src={generatedVideo} />
                     <div className="absolute bottom-4 right-4">
                        <a href={generatedVideo} download="veo_generation.mp4" className="bg-black/80 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-gray-700">
                           <Download className="w-4 h-4" /> Download MP4
                        </a>
                     </div>
                  </div>
               ) : (
                  <div className="text-center text-gray-600">
                     <VideoIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                     <p>Motion assets will appear here.</p>
                  </div>
               )}
            </div>
          </div>
        )}

        {/* COLLABORATIVE CANVAS */}
        {activeTab === 'canvas' && (
           <div className="h-full flex flex-col lg:flex-row gap-6">
              {/* Strategy Panel */}
              <div className="w-full lg:w-1/3 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col">
                 <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-400" /> Ad Strategy
                 </h3>
                 <div className="space-y-4 mb-6">
                    <input 
                       className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm text-white focus:border-green-500"
                       placeholder="Product Name / Service"
                       value={canvasProduct}
                       onChange={(e) => setCanvasProduct(e.target.value)}
                    />
                    <textarea 
                       className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm text-white focus:border-green-500 h-24 resize-none"
                       placeholder="Campaign Goal (e.g. Drive leads for SaaS Webinar)"
                       value={canvasGoal}
                       onChange={(e) => setCanvasGoal(e.target.value)}
                    />
                    <button 
                       onClick={handleGenerateCopy}
                       disabled={copyLoading || !canvasProduct}
                       className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                       {copyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Copy'}
                    </button>
                 </div>

                 <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {generatedCopy.map((copy, i) => (
                       <div key={i} className="bg-black border border-gray-800 p-4 rounded-lg hover:border-gray-600 transition-colors cursor-pointer group relative">
                          <p className="text-xs font-bold text-gray-500 uppercase mb-1">Option {i+1}</p>
                          <h4 className="font-bold text-white mb-2">{copy.headline}</h4>
                          <p className="text-sm text-gray-300 leading-relaxed">{copy.body}</p>
                          <button className="absolute top-2 right-2 p-1 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                             <Save className="w-4 h-4" />
                          </button>
                       </div>
                    ))}
                    {generatedCopy.length === 0 && !copyLoading && (
                       <div className="text-center text-gray-600 mt-12">
                          <p>Enter details to generate high-conversion ad copy.</p>
                       </div>
                    )}
                 </div>
              </div>

              {/* Asset Locker */}
              <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col">
                 <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-blue-400" /> Campaign Assets
                 </h3>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
                    {assets.map((asset) => (
                       <div key={asset.id} className="relative group aspect-square bg-black rounded-lg border border-gray-800 overflow-hidden">
                          {asset.type === 'image' ? (
                             <img src={asset.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          ) : (
                             <video src={asset.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                             <span className="text-[10px] font-bold uppercase text-gray-400">{asset.type}</span>
                             <p className="text-xs text-white line-clamp-1">{asset.prompt}</p>
                          </div>
                       </div>
                    ))}
                    <div className="border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-400 hover:border-gray-600 cursor-pointer transition-colors" onClick={() => setActiveTab('image')}>
                       <div className="text-center">
                          <PlusIcon className="w-8 h-8 mx-auto mb-1" />
                          <span className="text-xs font-bold">New Asset</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

const PlusIcon = ({className}:{className?:string}) => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

export default AIAdStudio;
