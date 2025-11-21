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
