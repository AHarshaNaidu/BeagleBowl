require('dotenv').config()

const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: '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', dangerouslyAllowBrowser: true });
export async function suggestRecipe(ingredients: string[]) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "You are a world-class chef specializing in creating delicious recipes for beagle breed dog from available ingredients for one lunch make sure that the recipe is suggested is safe for the beagle dog to eat. Your task is to suggest a recipe based on the provided ingredients, ensuring it's both appealing and practical and also safe for the beagle dog to eat, make sure thet the recipe is for only one beagle dog and make the suggestion accordingly"
      },
      {
        "role": "user",
        "content": `Create a recipe using some or all of these ingredients: ${ingredients.join(', ')}. 
        
        Please format your response in HTML with the following structure:
        
        <div class="recipe">
          <h1 class="recipe-title">[Recipe Name]</h1>
          
          <div class="recipe-metadata">
            <p class="recipe-difficulty">[Difficulty Level]</p>
            <p class="recipe-time">Preparation Time: [Prep Time]</p>
            <p class="recipe-time">Cooking Time: [Cook Time]</p>
            <p class="recipe-servings">Servings: [Number of bites]</p>
          </div>
          
          <div class="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              [List each ingredient with quantity]
            </ul>
          </div>
          
          <div class="recipe-instructions">
            <h2>Instructions</h2>
            <ol>
              [List each step of the cooking process]
            </ol>
          </div>
          
          <div class="recipe-notes">
            <h2>Notes</h2>
            <p>[Any additional tips, variations, or serving suggestions]</p>
          </div>
        </div>

        Ensure the recipe is creative, uses the ingredients efficiently, and provides clear instructions. If there are common pantry items not listed in the ingredients (like salt, pepper, or oil), you can assume they are available and include them in the recipe.`
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 0.7,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });

  return chatCompletion.choices[0]?.message?.content || '';
}
