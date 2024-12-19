import {ActionReducerMap} from '@ngrx/store';
import {pokemonsReducer, PokemonState} from './pokemon.reducers';
import { historyVsReducer, HistoryVsState } from './historyvs.reducers';

export interface AppState{
  pokemonList:PokemonState,
  historyVs:HistoryVsState

}

export const appReducers:ActionReducerMap<AppState>={
  pokemonList:pokemonsReducer,
  historyVs:historyVsReducer
}
