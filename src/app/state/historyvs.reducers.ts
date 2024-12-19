import { Action, createReducer, on } from "@ngrx/store";
import { PokemonChar } from "../models/pokemon.models";
import { clearPokemons, getHVSPokemons } from "./historyvs.actions";

export interface PokemonVs {
  pokemon1: PokemonChar;
  pokemon2: PokemonChar;
  winner: string;
}

export interface HistoryVsState {
  listVS: PokemonVs[];
}
export const initialState:HistoryVsState= {
  listVS:[],
}
const _historyVsReducer = createReducer(initialState,
  on(getHVSPokemons,(state, {pokemonsVS})=>({
    ...state,
    listVS: [...state.listVS, pokemonsVS]
  })),
  on(clearPokemons,(state)=>({...state, listVS: []})),
);

export function historyVsReducer(state:HistoryVsState|undefined , actions:Action){
  return  _historyVsReducer(state,actions)
}
