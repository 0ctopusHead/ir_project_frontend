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
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
const recipeStore = useRecipeStore()
const recipe = recipeStore.recipe
console.log(recipe)
</script>
