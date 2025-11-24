export interface IRECIPE {
    id: number;
    name: string;
    image: string;
    rating: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number | string;
    servings: number;
    cuisine: string;
    saved: boolean;
    color: string;
    difficulty: string;
}


export interface IDetailRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}
