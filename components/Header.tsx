import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'generator') => void;
  currentView: 'home' | 'generator' | 'postDetail';
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const navLinkClasses = "font-sans font-medium text-sm transition-colors";
  const activeLinkClasses = "text-brand-primary";
  const inactiveLinkClasses = "text-brand-text-secondary hover:text-brand-text-primary";
  
  return (
    <header className="bg-brand-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div 
            className="text-2xl font-extrabold text-brand-text-primary cursor-pointer tracking-tight"
            onClick={() => onNavigate('home')}
          >
            Yummy Blog
          </div>
          <nav>
              <div className="flex items-center space-x-8">
                  <button onClick={() => onNavigate('home')} className={`${navLinkClasses} ${currentView === 'home' || currentView === 'postDetail' ? activeLinkClasses : inactiveLinkClasses}`}>
                      Home
                  </button>
                  <button onClick={() => onNavigate('generator')} className={`${navLinkClasses} ${currentView === 'generator' ? activeLinkClasses : inactiveLinkClasses}`}>
                      AI Assistant
                  </button>
              </div>
          </nav>
      </div>
    </header>
  );
};