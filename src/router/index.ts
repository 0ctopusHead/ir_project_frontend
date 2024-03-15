import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeListView from '@/views/RecipeListView.vue'
import RecipeDetail from '@/views/RecipeDetail.vue'
import { useRecipeStore } from '@/stores/recipe'
import QueryService from '@/services/QueryService'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/recipe-search',
      name: 'recipe',
      component: RecipeListView
    },
    {
      path: '/recipe/:id',
      name: 'recipe-detail',
      component: RecipeDetail,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const recipeStore = useRecipeStore()
        recipeStore.getRecipeById(id)
        console.log(recipeStore)
      }
    }
  ]
})

export default router
