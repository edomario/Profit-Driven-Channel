import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  MessageSquare, 
  Star, 
  X, 
  UploadCloud, 
  Tags,
  Save,
  Loader2
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>;
  onSubmit: (data: BlogPost) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    subtitle: '',
    body: '',
    tags: [],
    allowComments: true,
    allowRatings: true,
    coverImage: '',
    status: 'draft',
    ...initialData
  });

  const [tagInput, setTagInput] = useState('');

  // Handle Cover Image (Mock)
  const handleImageUpload = () => {
    const mockImages = [
      'https://images.unsplash.com/photo-1499750310159-52f0f83463dd?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000'
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setFormData(prev => ({ ...prev, coverImage: randomImage }));
  };

  // Tag Management
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tagToRemove) }));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Title is required');
      return;
    }

    // Construct final object (filling in defaults for new posts)
    const finalPost: BlogPost = {
      id: formData.id || `blog_${Date.now()}`,
      title: formData.title!,
      subtitle: formData.subtitle,
      slug: formData.slug || formData.title!.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      body: formData.body,
      coverImage: formData.coverImage,
      status: 'published', // Default to published for this action
      publishedAt: formData.publishedAt || new Date().toLocaleDateString(),
      views: formData.views || 0,
      conversions: formData.conversions || 0,
      tags: formData.tags || [],
      allowComments: formData.allowComments,
      allowRatings: formData.allowRatings,
      author: formData.author || {
        name: 'You',
        role: 'Author',
        avatar: 'https://ui-avatars.com/api/?name=You&background=000&color=fff'
      }
    };

    onSubmit(finalPost);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Cover Image */}
          <div className="relative group w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden hover:border-gray-400 transition-colors">
            {formData.coverImage ? (
              <>
                <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={handleImageUpload} 
                    className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-gray-50"
                  >
                    Change Image
                  </button>
                </div>
              </>
            ) : (
              <div 
                onClick={handleImageUpload} 
                className="text-center cursor-pointer p-8 w-full h-full flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-600">Upload Cover Image</span>
                <span className="text-xs text-gray-400 mt-1">1200x600 px recommended</span>
              </div>
            )}
          </div>

          {/* Text Fields */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
              <input 
                type="text" 
                className="w-full text-2xl font-bold border-gray-300 rounded-lg p-3 focus:ring-black focus:border-black placeholder-gray-300"
                placeholder="Enter a catchy headline..."
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input 
                type="text" 
                className="w-full text-lg text-gray-600 border-gray-300 rounded-lg p-3 focus:ring-black focus:border-black placeholder-gray-300"
                placeholder="A short hook or summary..."
                value={formData.subtitle}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Body Content</label>
              <textarea 
                className="w-full min-h-[400px] border-gray-300 rounded-lg p-4 text-base focus:ring-black focus:border-black placeholder-gray-300 leading-relaxed"
                placeholder="Start writing your masterpiece..."
                value={formData.body}
                onChange={e => setFormData({ ...formData, body: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Settings */}
        <div className="space-y-6">
          
          {/* Actions */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6">
            <h3 className="font-bold text-gray-900 mb-4">Publishing</h3>
            <div className="flex flex-col gap-3">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {formData.status === 'published' ? 'Update Post' : 'Publish Now'}
              </button>
              {onCancel && (
                <button 
                  type="button" 
                  onClick={onCancel}
                  className="w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Tags className="w-4 h-4 text-gray-500" /> Tags
            </h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map(tag => (
                  <span key={tag} className="inline-flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                placeholder="Type tag & press Enter"
                className="w-full border-gray-300 rounded-lg p-2 text-sm focus:ring-black focus:border-black"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={addTag}
              />
            </div>
          </div>

          {/* Engagement */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-500" /> Engagement
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700">Allow Comments</span>
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, allowComments: !prev.allowComments }))}
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${formData.allowComments ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${formData.allowComments ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700">Enable Ratings</span>
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, allowRatings: !prev.allowRatings }))}
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${formData.allowRatings ? 'bg-amber-500' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${formData.allowRatings ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
};

export default BlogPostForm;