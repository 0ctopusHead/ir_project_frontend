<template>
  <!-- component -->
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold">RecipeBookMarker</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <form @submit="handleLogin" :error="errors">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="relative">
                  <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
                    >Username</label
                  >
                  <InputText type="text" v-model="username" :error="errors['username']"></InputText>
                </div>
                <div class="relative">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                    >Password</label
                  >
                  <InputText
                    type="password"
                    v-model="password"
                    :error="errors['password']"
                  ></InputText>
                </div>
                <div class="relative">
                  <button class="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const validationSchema = yup.object({
  username: yup.string().required('The username is required'),
  password: yup.string().required('The password is required')
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: ''
  }
})
const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const handleLogin = handleSubmit((value) => {
  authStore
    .login(value.username, value.password)
    .then(() => router.push({ name: 'home' }))
    .catch((err) => {
      console.log(err)
    })
})
</script>
