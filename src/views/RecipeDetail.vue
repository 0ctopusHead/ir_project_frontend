<template>
  <div v-if="recipe">
    <div class="flex flex-col items-center">
      <img class="max-w-sm max-h-sm" :src="recipe.Images" />
    </div>
    <p><b>Dish Name: </b>{{ recipe.Name }}</p>
    <br />
    <p><b>Description: </b>{{ recipe.Description }}</p>
    <br />
    <p><b>Recipe: </b>{{ recipe.RecipeIngredientParts }}</p>
    <br />
    <p><b>Instruction: </b>{{ recipe.RecipeInstructions }}</p>
  </div>
  <form>
    <BaseSelect :options="folders" v-model="bookmark.folder_id"></BaseSelect>
    <button type="submit">Add To Bookmark</button>
  </form>
</template>

<script setup lang="ts">
import BaseSelect from '../components/BaseSelect.vue'
import { useRecipeStore } from '@/stores/recipe'
import { useAuthStore } from '@/stores/auth'
import type { Bookmark } from '@/type'
import type { Folder } from '@/type'
import { ref } from 'vue'
import FolderService from '@/services/FolderService'
const authStore = useAuthStore()
const folders = ref<Folder[]>([])
const recipeStore = useRecipeStore()
const recipe = recipeStore.recipe
const userId = authStore.user?.id as number
console.log(recipe)
const bookmark = ref<Bookmark>({
  id: 0,
  user_id: userId,
  folder_id: 0,
  recipe: {
    aggregated_rating: recipe?.AggregatedRatings as number,
    author_id: recipe?.AuthorId as number,
    author_name: recipe?.AuthorName as string,
    description: recipe?.Description as string,
    image: recipe?.Images as string,
    name: recipe?.Name as string,
    recipe_category: recipe?.RecipeCategory as string,
    recipe_id: recipe?.RecipeId as number,
    recipe_ingredient: recipe?.RecipeIngredientParts as string,
    recipe_instruction: recipe?.RecipeInstructions as string,
    review_count: recipe?.ReviewCount as number
  },
  user_review: 0
})
FolderService.getFolder(authStore.user?.id as number).then((response) => {
  folders.value = response.data
})
</script>
