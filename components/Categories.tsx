import React from 'react';
import { POSTS } from '../constants';

interface CategoryCardProps {
    image: string;
    title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title }) => (
    <div className="relative rounded-xl overflow-hidden h-48 shadow-sm group">
        <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"/>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white text-brand-text-primary font-sans font-bold py-2 px-6 rounded-full">
                {title}
            </div>
        </div>
    </div>
)

export const Categories: React.FC = () => {
    const cat1 = POSTS[0];
    const cat2 = POSTS[1];
    const cat3 = POSTS[2];

    if (!cat1 || !cat2 || !cat3) {
        return null; // Don't render if we don't have at least 3 posts for category images
    }

    return (
        <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <CategoryCard image={cat1.imageUrl.replace('w=600', 'w=800')} title="Food" />
                <CategoryCard image={cat2.imageUrl.replace('w=600', 'w=800')} title="Cooking" />
                <CategoryCard image={cat3.imageUrl.replace('w=600', 'w=800')} title="Life Style" />
            </div>
        </div>
    )
}