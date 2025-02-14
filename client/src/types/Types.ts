export type RecipeTypes = {
  recipeName: string;
  recipeIngredients: { ingredientName: string; ingredientQty: number }[];
  recipeDescription: string;
  recipeInstruction: string;
  createdBy: string;
  category: string;
  photoUrl: string;
  photoId: string;
  cookingTime: number;
};
