import { defineStore } from 'pinia'
import type { QueryResults } from '@/type'
import type { BookmarkFolder } from '@/type'

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipe: null as QueryResults | null,
    recipes: [] as QueryResults[],
    bookmarks: [] as BookmarkFolder[]
  }),
  actions: {
    setRecipes(recipes: QueryResults[]) {
      this.recipes = recipes
    },
    getRecipeById(recipeId: number) {
      this.recipe = this.recipes.find((recipe) => recipe.RecipeId === recipeId) || null
    },
    setBookmarks(bookmarks: BookmarkFolder[]) {
      this.bookmarks = bookmarks
    }
  }
})
