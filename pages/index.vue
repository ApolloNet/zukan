<template>
  <div class="h-screen flex flex-col">
    <header class="flex p-4 bg-purple-900 text-yellow-300">
      <h1 class="mr-auto leading-none text-2xl">図鑑 Zukan</h1>
      <FilterForm />
    </header>
    <main class="flex-grow bg-purple-600">
      <div class="grid grid-cols-5 gap-4 p-3">
        <Card v-for="pokemon in pokemons" :key="pokemon.p.id" :pokemon="pokemon" />
      </div>
      <div v-if="!pokemons.length" class="p-4 text-yellow-300">
        <p class="pb-2 font-bold">No results found</p>
        <p>Suggestions:</p>
        <ul class="list-inside list-disc">
          <li>Make sure all words are spelled correctly.</li>
          <li>Try fewer filters.</li>
        </ul>
        </div>
    </main>
    <footer class="flex p-4 bg-purple-900 text-yellow-300 justify-center">
      <p>Data from <a href="https://pokeapi.co/" target="_blank">PokeAPI</a></p>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import { NamedAPIResource, PokemonType } from 'pokenode-ts'
import { ZukanPokemon } from '../types'
import Card from '../components/Card.vue'
import FilterForm from '../components/FilterForm.vue'

export default Vue.extend({
  components: {
    Card,
    FilterForm,
  },
  data() {
    return {
      limit: 5, // FIXME: 25,
      offset: 0,
      max: 5, // FIXME: 150
    }
  },
  computed: {
    ...mapState([ 'pokemonTypes']),
    pokemons(): ZukanPokemon[] {
      return this.filterPokemons()
    }
  },
  async mounted() {
    await this.getPokemons()
    await this.getTypes()
    await this.getHabitats()
    if (this.pokemons.length < this.max){
      this.getPokemons()
    }
  },
  methods: {
    ...mapActions(['storeHabitats', 'storePokemonTypes', 'storePokemon']),
    ...mapGetters(['filterPokemons']),
    async getTypes() {
      const response = await this.$axios.$get('https://pokeapi.co/api/v2/type/')
      const pokemonTypes = response.results.map((result: NamedAPIResource) => result.name)
      pokemonTypes.sort()
      this.storePokemonTypes(pokemonTypes)
    },
    async getHabitats() {
      const response = await this.$axios.$get('https://pokeapi.co/api/v2/pokemon-habitat/')
      const habitats = response.results.map((result: NamedAPIResource) => result.name)
      habitats.sort()
      this.storeHabitats(habitats)
    },
    async getPokemons() {
      const responsePokemons = await this.$axios.$get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
      for await (const result of responsePokemons.results) {
        const p = await this.$axios.$get(result.url)
        const species = await this.$axios.$get(p.species.url)
        const types = await Promise.all(p.types.map(async (pokemonType: PokemonType) => {
          const type = await this.$axios.$get(pokemonType.type.url)
          return type.name
        }))
        const pokemon = {p, species, types}
        this.storePokemon(pokemon)
      }
      this.offset += this.limit
    },
  }
})
</script>
