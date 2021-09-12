import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex/types'
import { ZukanPokemon } from '../types'

interface PokemonState {
  pokemons: ZukanPokemon[]
  pokemonTypes: string[]
  typeFilter: string
}

export const state: PokemonState = {
  pokemons: [],
  pokemonTypes: [],
  typeFilter: ''
}

export const getters: GetterTree<PokemonState, PokemonState> = {
  filterPokemons(state: PokemonState): ZukanPokemon[] {
    if (!state.typeFilter) {
      return state.pokemons
    }
    return state.pokemons.filter(pokemon => pokemon.types.includes(state.typeFilter))
  }
}

export const mutations: MutationTree<PokemonState> = {
  STORE_POKEMONS(state: PokemonState, pokemons: ZukanPokemon[] ) {
    state.pokemons.push(...pokemons)
  },
  STORE_POKEMON_TYPES(state: PokemonState, pokemonTypes: string[] ) {
    state.pokemonTypes = pokemonTypes
  },
  UPDATE_TYPE_FILTER(state: PokemonState, typeFilter: string ) {
    state.typeFilter = typeFilter
  },
}

export const actions: ActionTree<PokemonState, PokemonState> = {
  updatePokemons(context: ActionContext<PokemonState, PokemonState>, pokemons: ZukanPokemon[]) {
    const newPokemons = pokemons.filter(pokemon => {
      const pokemonIsAlreadyInStore = state.pokemons.find(statePokemon => statePokemon.p.id === pokemon.p.id)
      return !pokemonIsAlreadyInStore
    })
    context.commit('STORE_POKEMONS', newPokemons)
  },
  updatePokemonTypes(context: ActionContext<PokemonState, PokemonState>, pokemonTypes: string[]) {
    context.commit('STORE_POKEMON_TYPES', pokemonTypes)
  },
  updateTypeFilter(context: ActionContext<PokemonState, PokemonState>, typeFilter: string) {
    context.commit('UPDATE_TYPE_FILTER', typeFilter)
  },
}
