import React from 'react';
import { Post } from '../types';
import { ClockIcon } from './icons/ClockIcon';

interface BlogPostCardProps {
  post: Post;
  onPostSelect: (post: Post) => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onPostSelect }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPostSelect(post);
    }
  };
  
  return (
    <div 
      className="bg-brand-surface group cursor-pointer rounded-lg overflow-hidden border border-brand-border transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
      onClick={() => onPostSelect(post)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="overflow-hidden">
        <img className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" src={post.imageUrl} alt={post.title} />
      </div>
      <div className="p-6">
        <p className="text-brand-primary font-sans font-bold text-xs uppercase tracking-widest mb-2">{post.category}</p>
        <h3 className="text-2xl font-serif font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors duration-300 leading-tight">{post.title}</h3>
        <div className="flex items-center text-brand-text-secondary mt-3">
          <ClockIcon className="w-4 h-4 mr-2" />
          <span className="text-sm font-sans">{post.cookingTime}</span>
        </div>
      </div>
    </div>
  );
};