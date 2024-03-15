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
