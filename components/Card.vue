<template>
  <article class="p-2 border border-gray-300 rounded-lg" :data-types="pokemon.types.join(',')">
    <div class="h-full p-3 bg-gray-100">
      <header class="flex justify-between mb-3">
        <h1 class="text-lg text-red-500">
          <span>#{{ pokemon.p.id }}</span>
          <span class="capitalize">{{ pokemon.p.name }}</span>
        </h1>
        <div>
          <ul class="flex">
            <li v-for="pokemonType in pokemon.types" :key="pokemonType" class="ml-1 px-1 bg-gray-300 rounded">
              {{ pokemonType }}
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div class="mb-3 bg-white rounded-lg">
          <img :src="pokemon.p.sprites.front_default" alt="" class="h-40 mx-auto">
        </div>
        <p>Height: {{ pokemon.p.height }} ft</p>
        <p>Weight: {{ pokemon.p.weight / 10 }} kg</p>
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
import { PokemonAbility, PokemonType, VerboseEffect } from 'pokenode-ts'
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
