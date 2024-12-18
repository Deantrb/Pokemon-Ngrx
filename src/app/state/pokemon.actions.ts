import {createAction, props} from '@ngrx/store';
import { PokemonChar} from '../models/pokemon.models';


export const cargarPokemons = createAction ("[Pokemon], Cargar Pokemons")
export const cargaPokemonsSuccess = createAction ("[Pokemon], Cargar Pokemons Success",props<{pokemons:PokemonChar[]}>())
export const cargaPokemonError = createAction ("[Pokemon], Cargar Pokemons Error",props<{payload:any}>())
