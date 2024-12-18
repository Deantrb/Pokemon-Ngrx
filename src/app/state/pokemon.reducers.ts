import { PokemonChar} from '../models/pokemon.models';
import {Action, createReducer, on} from '@ngrx/store';
import {cargaPokemonError, cargaPokemonsSuccess, cargarPokemons} from './pokemon.actions';


export interface PokemonState{
  pokemons:PokemonChar[],
  loaded:boolean,
  loading:boolean,
  error:any
}
export const initialState:PokemonState= {
  pokemons:[],
  loaded:false,
  loading:false,
  error:null,
}


const _pokemonsReducer = createReducer(initialState,
  on(cargarPokemons,state => ({...state, loading:true})),
  on(cargaPokemonsSuccess,(state, {pokemons}) => ({
    ...state,
    loading:false,
    loaded:true,
    pokemons:[...pokemons]
  })),
  on(cargaPokemonError, (state,{ payload })=>({
    ...state,
    loading:false,
    loaded:false,
    error:{
      url:payload.url,
      name:payload.name,
      message:payload.message,

    }
  })),
  );

export function pokemonsReducer(state:PokemonState|undefined , actions:Action){
  return  _pokemonsReducer(state,actions)
}
