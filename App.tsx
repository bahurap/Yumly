import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecipeGenerator } from './components/RecipeGenerator';
import { BlogPostCard } from './components/BlogPostCard';
import { POSTS } from './constants';
import { Post } from './types';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';

type View = 'home' | 'generator' | 'postDetail';

const formatContent = (text: string): string => {
  if (!text || typeof window === 'undefined' || !(window as any).marked) return '';
  const marked = (window as any).marked;
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: false,
    smartLists: true,
    smartypants: true,
  });
  const rawHtml = marked.parse(text);

  // Use the DOM to add a class to the ingredients list for special styling
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = rawHtml;

  const headings = Array.from(tempDiv.querySelectorAll('h2'));
  const ingredientsHeading = headings.find(h => h.textContent?.trim().toLowerCase() === 'ingredients');

  if (ingredientsHeading && ingredientsHeading.nextElementSibling && ingredientsHeading.nextElementSibling.tagName === 'UL') {
    ingredientsHeading.nextElementSibling.classList.add('ingredients-list');
  }

  return tempDiv.innerHTML;
};

const HomePage: React.FC<{ onPostSelect: (post: Post) => void }> = ({ onPostSelect }) => (
  <>
    <Hero />
    <Categories />
    <div className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {POSTS.map(post => (
          <BlogPostCard key={post.id} post={post} onPostSelect={onPostSelect} />
        ))}
      </div>
    </div>
  </>
);

const PostDetailPage: React.FC<{ post: Post, onBack: () => void }> = ({ post, onBack }) => (
  <div className="max-w-4xl mx-auto">
    <button onClick={onBack} className="inline-flex items-center text-brand-primary font-bold mb-8 hover:text-brand-primary-hover transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      Back to all recipes
    </button>
    <div className="bg-brand-surface rounded-lg shadow-md overflow-hidden p-6 sm:p-10 border border-brand-border">
       <img className="w-full h-96 object-cover rounded-md mb-8" src={post.imageUrl.replace('w=600', 'w=1200')} alt={post.title} />
       <p className="text-brand-primary font-sans font-bold text-sm uppercase tracking-widest mb-2">{post.category}</p>
       <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-text-primary leading-tight">{post.title}</h1>
       <p className="text-brand-text-secondary mt-4">By {post.author} &bull; {post.date}</p>
       <article className="prose-styling max-w-none mt-8" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
    </div>
  </div>
);


const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleNavigate = (newView: View) => {
    setView(newView);
    setSelectedPost(null); // Reset post selection on main navigation
    window.scrollTo(0, 0);
  }
  
  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
    setView('postDetail');
    window.scrollTo(0, 0);
  }

  const renderContent = () => {
    switch(view) {
      case 'home':
        return <HomePage onPostSelect={handlePostSelect} />;
      case 'generator':
        return <RecipeGenerator />;
      case 'postDetail':
        if (selectedPost) {
          return <PostDetailPage post={selectedPost} onBack={() => handleNavigate('home')} />;
        }
        return <HomePage onPostSelect={handlePostSelect} />;
      default:
        return <HomePage onPostSelect={handlePostSelect} />;
    }
  }

  return (
    <div className="bg-brand-background min-h-screen flex flex-col font-sans">
      <Header onNavigate={handleNavigate} currentView={view} />
      <main className="container mx-auto px-4 py-8 sm:py-12 flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;