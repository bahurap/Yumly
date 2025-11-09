import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-16">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-brand-text-secondary">
          <p>&copy; {new Date().getFullYear()} Yummy Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};