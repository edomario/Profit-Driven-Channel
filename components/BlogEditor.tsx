import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { BlogPost } from '../types';
import BlogPostForm from './BlogPostForm';

interface BlogEditorProps {
  onBack: () => void;
  onPublish: (post: BlogPost) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onBack, onPublish }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 flex items-center">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </button>
        <span className="ml-4 text-sm text-gray-300">|</span>
        <h1 className="ml-4 text-lg font-bold text-gray-900">New Article</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogPostForm 
          onSubmit={onPublish}
          onCancel={onBack}
        />
      </div>
    </div>
  );
};

export default BlogEditor;