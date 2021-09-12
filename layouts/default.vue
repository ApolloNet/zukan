<template>
  <div class="h-screen flex flex-col">
    <header class="flex p-4 bg-purple-900 text-yellow-300">
      <h1 class="mr-auto leading-none text-2xl">図鑑 Zukan</h1>
      <FilterForm />
    </header>
    <main class="flex-grow bg-purple-600">
      <Nuxt />
    </main>
    <footer class="flex p-4 bg-purple-900 text-yellow-300 justify-center">
      <p>Data from <a href="https://pokeapi.co/" target="_blank" class="underline">PokeAPI</a></p>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FilterForm from '../components/FilterForm.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  components: {
    FilterForm
  }
})
</script>