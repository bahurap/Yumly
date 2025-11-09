import React from 'react';

const SocialIcon: React.FC<{ href: string, path: string, label: string }> = ({ href, path, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-text-secondary hover:text-brand-primary transition-colors" aria-label={label}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
        </svg>
    </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-background border-t border-brand-border mt-16">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-brand-text-secondary">
          <p>&copy; {new Date().getFullYear()} Yummy Blog. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-5">
            <SocialIcon href="#" path="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.26C11.73,8.6 11.77,8.92 11.84,9.23C8.28,9.06 5.1,7.38 2.9,4.79C2.53,5.42 2.33,6.16 2.33,6.96C2.33,8.43 3.08,9.73 4.18,10.45C3.49,10.42 2.83,10.23 2.22,9.92V9.97C2.22,12.08 3.68,13.84 5.7,14.25C5.31,14.36 4.9,14.41 4.48,14.41C4.19,14.41 3.91,14.38 3.63,14.33C4.18,16.08 5.81,17.3 7.77,17.33C6.32,18.46 4.47,19.16 2.5,19.16C2.15,19.16 1.8,19.14 1.45,19.1C3.43,20.4 5.77,21.16 8.28,21.16C16,21.16 20.33,14.48 20.33,8.79C20.33,8.62 20.33,8.45 20.32,8.28C21.1,7.68 21.85,6.9 22.46,6Z" label="Follow us on X" />
            <SocialIcon href="#" path="M12 2.163c3.204 0 3.584.012 4.85.07 1.264.058 2.148.272 2.91.576.824.328 1.48.768 2.124 1.412s1.084 1.3 1.412 2.124c.304.762.518 1.646.576 2.91.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.264-.272 2.148-.576 2.91-.328.824-.768 1.48-1.412 2.124s-1.3 1.084-2.124 1.412c-.762.304-1.646.518-2.91.576-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.264-.058-2.148-.272-2.91-.576-.824-.328-1.48-.768-2.124-1.412S.925 18.06.513 17c-.304-.762-.518-1.646-.576-2.91C-.121 12.825-.143 12.445-.143 9.19S-.121 5.606-.065 4.34c.058-1.264.272-2.148.576-2.91.328-.824.768-1.48 1.412-2.124S3.28.216 4.304.788c.762-.304 1.646-.518 2.91-.576C8.48.154 8.86 0 12.115 0h.001z" label="Follow us on Instagram" />
        </div>
      </div>
    </footer>
  );
};