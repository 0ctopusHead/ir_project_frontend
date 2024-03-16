export interface QueryItems {
  corrected_query: string
  elapse: number
  results: QueryResults[]
}
export interface QueryResults {
  AggregatedRatings: number
  AuthorId: number
  AuthorName: string
  Description: string
  Images: string
  Name: string
  RecipeCategory: string
  RecipeId: number
  RecipeIngredientParts: string
  RecipeInstructions: string
  ReviewCount: number
  score: number
}

export interface User {
  id: number
  username: string
  password: string
  email: string
}

export interface Folder {
  id: number
  user_id: number
  name: string
  bookmarks: Bookmark[]
}

export interface Bookmark {
  id: number
  user_id: number
  folder_id: number
  recipe: RecipeBookmark
  user_review: number
}

export interface RecipeBookmark {
  aggregated_rating: number
  author_id: number
  author_name: string
  description: string
  image: string
  name: string
  recipe_category: string
  recipe_id: number
  recipe_ingredient: string
  recipe_instruction: string
  review_count: number
}
