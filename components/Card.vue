<template>
  <article :id="pokemon.p.id" class="p-2 bg-white rounded-lg text-purple-900" @click="$emit('display-detail', pokemon)">
    <div class="h-full p-3 bg-purple-100 rounded-lg">
      <header class="flex justify-between items-center mb-3">
        <h1 class="text-xl">
          <span class="text-yellow-500">#{{ pokemon.p.id }}</span>
          <span class="text-purple-700 capitalize" data-test="pokemon-name">{{ pokemon.p.name }}</span>
        </h1>
        <div>
          <ul class="flex">
            <li v-for="pokemonType in pokemon.types" :key="pokemonType" class="ml-1 px-1 bg-purple-400 rounded text-white">
              {{ pokemonType }}
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div class="mb-3 py-4 bg-white rounded-lg">
          <img :src="pokemon.p.sprites.front_default" loading="lazy" alt="" class="h-40 mx-auto" />
        </div>
        <p>Habitat: {{ pokemon.species.habitat.name }}</p>
        <p>Height: {{ pokemon.p.height }} ft</p>
        <p>Weight: {{ pokemon.p.weight / 10 }} kg</p>
      </main>
    </div>
  </article>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { PropType } from 'vue/types'
  import { ZukanPokemon } from '../types'

  export default Vue.extend({
    name: 'Card',
    props: {
      pokemon: {
        type: Object as PropType<ZukanPokemon>,
        required: true,
      },
    },
  })
</script>

<style scoped>
  article {
    @apply cursor-pointer;
  }
</style>
