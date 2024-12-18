import {ActionReducerMap} from '@ngrx/store';
import {pokemonsReducer, PokemonState} from './pokemon.reducers';

export interface AppState{
  pokemonList:PokemonState,
  // historyVs:any
}

export const appReducers:ActionReducerMap<AppState>={
  pokemonList:pokemonsReducer,
  // historyVs:null,
}
