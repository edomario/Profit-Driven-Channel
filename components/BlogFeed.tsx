import React, { useState } from 'react';
import { BlogPost, User } from '../types';
import { Search, Filter, Calendar, MessageSquare, Star, ArrowRight, User as UserIcon, PenSquare } from 'lucide-react';

interface BlogFeedProps {
  onRead: (post: BlogPost) => void;
  posts: BlogPost[];
  user?: User | null;
  onCreatePost?: () => void;
}

const BlogFeed: React.FC<BlogFeedProps> = ({ onRead, posts, user, onCreatePost }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract unique tags
  const allTags = ['All', ...Array.from(new Set(posts.flatMap(p => p.tags)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const canWrite = user && ['trainer', 'consultant', 'admin', 'enterprise_admin'].includes(user.role);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Executive Insights</h1>
          <p className="text-lg text-gray-500">
            Tactical advice, market analysis, and operating protocols.
          </p>
        </div>
        
        {canWrite && onCreatePost && (
           <button 
              onClick={onCreatePost}
              className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 flex items-center gap-2 shadow-sm"
           >
              <PenSquare className="w-4 h-4" /> Write Article
           </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${selectedTag === tag 
                  ? 'bg-black text-white' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-black focus:border-black"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full cursor-pointer"
              onClick={() => onRead(post)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.coverImage || `https://picsum.photos/seed/${post.id}/800/400`} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-white/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.publishedAt}
                  </span>
                  {post.allowRatings && post.averageRating && (
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-current" /> {post.averageRating}
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                {post.subtitle && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.subtitle}
                  </p>
                )}
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                      {post.author?.avatar ? (
                        <img src={post.author.avatar} className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-4 h-4 m-1 text-gray-500" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{post.author?.name || 'Unknown'}</span>
                  </div>
                  <span className="text-brand-600 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500">No articles found matching your criteria.</p>
          <button onClick={() => {setSearchTerm(''); setSelectedTag('All');}} className="mt-4 text-brand-600 font-bold hover:underline">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogFeed;