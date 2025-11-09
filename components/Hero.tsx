import React from 'react';
import { POSTS } from '../constants';

export const Hero: React.FC = () => {
  const heroImages = POSTS.slice(0, 3);
  const [img1, img2, img3] = heroImages;

  if (!img1) {
    return null; // Don't render hero if there are no posts
  }

  return (
    <div className="w-full h-[30rem] flex gap-2">
      <div className="flex-1 h-full">
        <img src={img1.imageUrl.replace('w=600', 'w=1000')} alt={img1.title} className="w-full h-full object-cover rounded-md"/>
      </div>
      {img2 && img3 && (
        <div className="flex-1 h-full hidden md:flex flex-col gap-2">
          <div className="flex-1 h-1/2">
              <img src={img2.imageUrl.replace('w=600', 'w=800')} alt={img2.title} className="w-full h-full object-cover rounded-md"/>
          </div>
          <div className="flex-1 h-1/2">
              <img src={img3.imageUrl.replace('w=600', 'w=800')} alt={img3.title} className="w-full h-full object-cover rounded-md"/>
          </div>
        </div>
      )}
    </div>
  );
};