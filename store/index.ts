import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex/types'
import { ZukanPokemon } from '../types'

interface PokemonState {
  pokemons: ZukanPokemon[]
  pokemonTypes: string[]
  habitats: string[]
  nameFilter: string
  typeFilter: string
  habitatFilter: string
}

export const state: PokemonState = {
  pokemons: [],
  pokemonTypes: [],
  habitats: [],
  nameFilter: '',
  typeFilter: '',
  habitatFilter: '',
}

export const getters: GetterTree<PokemonState, PokemonState> = {
  filterPokemons(state: PokemonState): ZukanPokemon[] {
    return state.pokemons
      .filter((pokemon) => state.nameFilter.length < 3 || pokemon.p.name.includes(state.nameFilter))
      .filter((pokemon) => !state.typeFilter || pokemon.types.includes(state.typeFilter))
      .filter((pokemon) => !state.habitatFilter || pokemon.species.habitat.name === state.habitatFilter)
  },
}

export const mutations: MutationTree<PokemonState> = {
  STORE_POKEMONS(state: PokemonState, pokemon: ZukanPokemon) {
    state.pokemons.push(pokemon)
  },
  STORE_POKEMON_TYPES(state: PokemonState, pokemonTypes: string[]) {
    state.pokemonTypes = pokemonTypes
  },
  STORE_HABITATS(state: PokemonState, habitats: string[]) {
    state.habitats = habitats
  },
  UPDATE_NAME_FILTER(state: PokemonState, nameFilter: string) {
    state.nameFilter = nameFilter
  },
  UPDATE_TYPE_FILTER(state: PokemonState, typeFilter: string) {
    state.typeFilter = typeFilter
  },
  UPDATE_HABITAT_FILTER(state: PokemonState, habitatFilter: string) {
    state.habitatFilter = habitatFilter
  },
}

export const actions: ActionTree<PokemonState, PokemonState> = {
  storeHabitats(context: ActionContext<PokemonState, PokemonState>, habitats: string[]) {
    context.commit('STORE_HABITATS', habitats)
  },
  storePokemonTypes(context: ActionContext<PokemonState, PokemonState>, pokemonTypes: string[]) {
    context.commit('STORE_POKEMON_TYPES', pokemonTypes)
  },
  storePokemon(context: ActionContext<PokemonState, PokemonState>, pokemon: ZukanPokemon) {
    const pokemonIsAlreadyInStore = state.pokemons.find((statePokemon) => statePokemon.p.id === pokemon.p.id)
    if (!pokemonIsAlreadyInStore) {
      context.commit('STORE_POKEMONS', pokemon)
    }
  },
  updateNameFilter(context: ActionContext<PokemonState, PokemonState>, nameFilter: string) {
    context.commit('UPDATE_NAME_FILTER', nameFilter)
  },
  updateTypeFilter(context: ActionContext<PokemonState, PokemonState>, typeFilter: string) {
    context.commit('UPDATE_TYPE_FILTER', typeFilter)
  },
  updateHabitatFilter(context: ActionContext<PokemonState, PokemonState>, habitatFilter: string) {
    context.commit('UPDATE_HABITAT_FILTER', habitatFilter)
  },
}
