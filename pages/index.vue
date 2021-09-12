<template>
  <div>
    <header class="flex p-4 bg-black text-white">
      <h1 class="mr-auto text-bold">図鑑 Pokemon Zukan</h1>
      <FilterForm />
    </header>
    <main>
      <div class="grid grid-cols-5 gap-4 p-3">
        <Card v-for="pokemon in pokemons" :key="pokemon.p.id" :pokemon="pokemon" />
      </div>
      <div class="text-center">
        <button class="rounded-lg">Load more</button>
      </div>
    </main>
    <footer></footer>
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
      max: 10, // FIXME: 150
    }
  },
  computed: {
    ...mapState([ 'pokemonTypes']),
    pokemons(): ZukanPokemon[] {
      return this.filterPokemons()
    }
  },
  async mounted() {
    await this.initTypes()
    await this.initPokemons(0)
  },
  methods: {
    ...mapActions(['updatePokemons', 'updatePokemonTypes']),
    ...mapGetters(['filterPokemons']),
    async initPokemons(offset: number) {
      const response = await this.$axios.$get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${offset}`)
      for await (const result of response.results) {
        const p = await this.$axios.$get(result.url)
        const types = await Promise.all(p.types.map(async (pokemonType: PokemonType) => {
          const type = await this.$axios.$get(pokemonType.type.url)
          return type.name
        }))
        const pokemon = {p, types}
        this.updatePokemons([pokemon])
      }
      if (this.pokemons.length < this.max){
        offset += this.limit
        this.initPokemons(offset)
      }
    },
    async initTypes() {
      const response = await this.$axios.$get('https://pokeapi.co/api/v2/type/')
      const pokemonTypes = response.results.map((result: NamedAPIResource) => result.name)
      pokemonTypes.sort()
      this.updatePokemonTypes(pokemonTypes)
    },
  }
})
</script>
