import React, { useState } from 'react';
import { generateRecipe } from '../services/geminiService';
import { LoadingSpinner } from './icons/LoadingSpinner';

const formatRecipe = (text: string): string => {
  if (!text || typeof window === 'undefined' || !(window as any).marked) return '';
  const marked = (window as any).marked;
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: false,
    smartLists: true,
    smartypants: true,
  });
  let rawHtml = marked.parse(text);
  
  // Normalize AI-generated h3 tags to h2 to match static content
  rawHtml = rawHtml.replace(/<h3/g, '<h2').replace(/<\/h3>/g, '</h2>');

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

export const RecipeGenerator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [dietPreference, setDietPreference] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please tell us what you want to cook!');
      return;
    }

    setLoading(true);
    setError(null);
    setRecipe('');

    try {
      const result = await generateRecipe({ query, dietPreference, cuisineType });
      setRecipe(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-12">
          <h1 className="text-6xl font-script text-brand-text-primary">AI Recipe Assistant</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-text-secondary">
              Have ingredients but no ideas? Tell us what you'd like to make, and our AI chef will whip up a custom recipe for you.
          </p>
      </div>

      <div className="max-w-2xl mx-auto bg-brand-surface rounded-lg shadow-sm p-8 mb-8 border border-brand-border">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label htmlFor="query" className="block text-brand-text-primary font-bold mb-2">What would you like to cook?</label>
            <input 
              type="text" 
              id="query" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-sans" 
              placeholder="e.g., Spicy chicken tacos" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="diet" className="block text-brand-text-primary font-bold mb-2">Dietary Preference</label>
              <select 
                id="diet" 
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value)}
                className="w-full p-3 border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-sans"
              >
                <option value="">Any</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-free</option>
                <option value="keto">Keto</option>
              </select>
            </div>

            <div>
              <label htmlFor="cuisine" className="block text-brand-text-primary font-bold mb-2">Cuisine Type</label>
              <select 
                id="cuisine" 
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                className="w-full p-3 border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-sans"
              >
                <option value="">Any</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-primary text-white py-3 px-6 rounded-md hover:bg-brand-primary-hover transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-sans font-bold text-lg" 
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner className="h-5 w-5 mr-3" />
                <span>Creating Recipe...</span>
              </div>
            ) : (
              <span>Generate Recipe</span>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {recipe && (
        <div className="max-w-4xl mx-auto bg-brand-surface rounded-lg shadow-md overflow-hidden mt-12 p-6 sm:p-10 border border-brand-border">
            <article className="prose-styling max-w-none" dangerouslySetInnerHTML={{ __html: formatRecipe(recipe) }} />
        </div>
      )}
    </>
  );
};