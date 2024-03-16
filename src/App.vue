<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()
const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}
function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="">
    <nav class="flex flex-box items-center">
      <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
        <li class="nav-item px-2"><router-link to="/" class="mr-5">Home</router-link></li>
        <li class="nav-item px-2">
          <router-link to="/recipe-search" class="mr-5">Search</router-link>
        </li>
        <li class="nav-item px-2"><router-link to="/about" class="mr-5">About</router-link></li>
        <li class="nav-item px-2">
          <font-awesome-icon icon="user" />
          {{ authStore.currentUserName }}
        </li>
        <li class="nav-item px-2">
          <a class="nav-link hover:cursor-pointer" @click="logout">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
