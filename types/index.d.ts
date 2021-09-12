import { Ability, Pokemon, PokemonSpecies } from 'pokenode-ts'

export interface ZukanPokemon {
  p: Pokemon
  species: PokemonSpecies
  types: string[]
  abilities: Ability[]
}