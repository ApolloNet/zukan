<template>
  <article :id="pokemon.p.id" class="p-2 bg-white rounded-lg text-purple-900">
    <div class="h-full p-3 bg-purple-100 rounded-lg">
      <header class="flex justify-between mb-3">
        <h1 class="text-lg">
          <span class="text-yellow-500">#{{ pokemon.p.id }}</span>
          <span class="text-purple-700 capitalize">{{ pokemon.p.name }}</span>
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
        <div class="mb-3 bg-white rounded-lg">
          <img :src="pokemon.p.sprites.front_default" loading="lazy" alt="" class="h-40 mx-auto">
        </div>
        <p>Height: {{ pokemon.p.height }} ft</p>
        <p>Weight: {{ pokemon.p.weight / 10 }} kg</p>
        <p>Habitat: {{ pokemon.species.habitat.name }}</p>
        <p class="my-2">{{ pokemon.species.flavor_text_entries[0].flavor_text }}</p>
        <p>Abilities:</p>
        <ul class="list-inside list-disc">
          <li v-for="(ability, index) in pokemon.abilities" :key="index">
            {{ ability.name }}:
            <span v-if="ability.effect_entries[0]">{{ ability.effect_entries[0].short_effect }}</span>
          </li>
        </ul>
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
    }
  },
  async mounted() {
    await this.updatePokemon()
  },
  methods: {
    async updatePokemon() {
      // this.abilities = await Promise.all(this.pokemon.abilities.map(async (pokemonAbility: PokemonAbility) => {
      //   const ability = await this.$axios.$get(pokemonAbility.ability.url)
      //   ability.effect_entries = ability.effect_entries.filter((effect: VerboseEffect) => effect.language.name === 'en')
      //   return ability
      // }))
    }
  }
})
</script>
