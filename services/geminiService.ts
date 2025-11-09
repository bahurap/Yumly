import { GoogleGenAI } from "@google/genai";

interface RecipeParams {
  query: string;
  dietPreference: string;
  cuisineType: string;
}

export async function generateRecipe({ query, dietPreference, cuisineType }: RecipeParams): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return Promise.reject("API key not found. Please set the API_KEY environment variable.");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  let prompt = `You are a world-class chef. A user wants to cook "${query}".`;

  if (dietPreference) {
    prompt += ` The recipe must be ${dietPreference}.`;
  }
  if (cuisineType) {
    prompt += ` It should be in the style of ${cuisineType} cuisine.`;
  }
  
  prompt += `

  Create a detailed, delicious, and easy-to-follow recipe.
  
  Your response must be formatted as clean markdown and include:
  - A catchy title for the recipe (e.g., ### Ultimate Chocolate Chip Cookies). Use a level 3 heading.
  - A brief, enticing description (blockquote).
  - An 'Ingredients' section (### heading).
  - An 'Instructions' section (### heading).
  - A 'Nutritional Information' section (### heading) with an estimated breakdown of calories, protein, carbs, and fat.
  
  Do not include any text before the first recipe title heading.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe. The AI model might be busy. Please try again later.");
  }
}
