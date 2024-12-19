import { createAction, props } from '@ngrx/store';
import { PokemonChar } from '../models/pokemon.models';
import { PokemonVs } from './historyvs.reducers';

export const getHVSPokemons = createAction(
  '[History] Pokemons VS',
  props<{pokemonsVS: PokemonVs}>()
);
export const clearPokemons = createAction( '[History] Clear Pokemons VS');
