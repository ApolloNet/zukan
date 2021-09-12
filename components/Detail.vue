<template>
  <div>
    <div class="flex mb-3 ml-6">
      <button class="text-yellow-500" @click="$emit('display-detail', null)">🠔 Back</button>
    </div>
    <article v-if="pokemon" :id="pokemon.p.id" class="mx-auto p-2 bg-white rounded-lg text-purple-900">
      <div class="h-full p-3 bg-purple-100 rounded-lg">
        <header class="flex justify-between items-center mb-3">
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
          <div class="mb-3 font-bold">
            <p v-if="pokemon.species.is_baby">Baby</p>
            <p v-if="pokemon.species.is_legendary">Legendary</p>
            <p v-if="pokemon.species.is_mythical">Mythical</p>
          </div>
          <p>Habitat: {{ pokemon.species.habitat.name }}</p>
          <p>Height: {{ pokemon.p.height }} ft</p>
          <p class="mb-3">Weight: {{ pokemon.p.weight / 10 }} kg</p>
          <p>Abilities</p>
          <ul>
            <li v-for="(ability, k) in abilities" :key="k">
              <strong>{{ ability.name }}</strong>:
              <span v-if="ability.effect_entries[0]">{{ ability.effect_entries[0].short_effect }}</span>
            </li>
          </ul>
        </main>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue/types'
import { Ability, PokemonAbility, VerboseEffect } from 'pokenode-ts'
import { ZukanPokemon } from '../types'

export default Vue.extend({
  name: 'Detail',
  props: {
    pokemon: {
      type: Object as PropType<ZukanPokemon>,
      required: true,
    }
  },
  data() {
    return {
      abilities: [] as Ability[],
    }
  },
  async mounted() {
    await this.updatePokemon()
  },
  methods: {
    async updatePokemon() {
      this.abilities = await Promise.all(this.pokemon.p.abilities.map(async (pokemonAbility: PokemonAbility) => {
        const ability = await this.$axios.$get(pokemonAbility.ability.url)
        ability.effect_entries = ability.effect_entries.filter((effect: VerboseEffect) => effect.language.name === 'en')
        return ability
      }))
    }
  }
})
</script>
