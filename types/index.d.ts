import { Ability, Pokemon } from 'pokenode-ts'

export interface ZukanPokemon {
  p: Pokemon
  types: string[]
  abilities: Ability[]
}