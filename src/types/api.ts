export interface Ingredient {
  description: string;
}

export interface RecipeStep {
  description: string;
  sort_number: string | number;
}

export interface Nutrition {
  calory: string | number;
  protein: string | number;
  carbohydrate: string | number;
  fat: string | number;
}

export interface CreateMenuPayload {
  name: string;
  description: string;
  cooking_duration: string | number;
  category_id: string | number;
  ingredients: Ingredient[];
  recipes: RecipeStep[];
  nutritions: Nutrition;
}

export interface UpdateMenuPayload extends Partial<CreateMenuPayload> {}

export interface Menu extends CreateMenuPayload {
  id: number | string;
  slug: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number | string;
  name: string;
  image?: string;
}

export interface GetMenusParams {
  page?: number | string;
  limit?: number | string;
  search?: string;
  category_id?: number | string;
}

export interface GetCategoriesParams {
  search?: string;
}
