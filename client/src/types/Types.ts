export type RecipeTypes = {
  recipeName: string;
  recipeIngredients: { ingredientName: string; ingredientQty: number }[];
  recipeDescription: string;
  recipeInstruction: string;
  createdBy: string;
  category:
    | "pork"
    | "beef"
    | "fish"
    | "chicken"
    | "vegetarian"
    | "vegan"
    | "dessert";
  photoUrl: string;
  photoId: string;
  cookingTime: number;
  _id?: string;
};

export type RecipePropsIndex = {
  recipeName: string;
  recipeDescription: string;
  cookingTime: number;
  category:
    | "pork"
    | "beef"
    | "fish"
    | "chicken"
    | "vegetarian"
    | "vegan"
    | "dessert";
};

export type UserTypes = {
  // username: string;
  // lastName: string;
  // firstName: string;
  // email: string;
  // setPassword: (args: string) => string;
  // password: string;
  // role: string;
  // createdAt: string;
  // photoId: string;
  // photoUrl: string;
  // _id: string;
  // status: number;
  userData: {
    username: string;
    lastName: string;
    firstName: string;
    email: string;
    setPassword: (args: string) => string;
    password: string;
    role: string;
    createdAt: string;
    photoId: string;
    photoUrl: string;
    _id: string;
    status: number;
  };
};

export type CategoryProps = {
  category: string;
};
