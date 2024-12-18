import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PokemonService} from '../service/pokemon.service';
import {cargaPokemonError, cargaPokemonsSuccess, cargarPokemons} from './pokemon.actions';
import {catchError, forkJoin, map, mergeMap, of} from 'rxjs';
import {PokemonChar} from '../models/pokemon.models';


@Injectable()
export class PokemonsEffects {
  private actions$ = inject(Actions);
  constructor(private pokemonService: PokemonService) {}

  cargarPokemons$ = createEffect(
    () => this.actions$.pipe(
      ofType(cargarPokemons),
      mergeMap(() => this.pokemonService.getPokemons().pipe(
        mergeMap(pokemonList => {
          const detailRequests = pokemonList.map((pokemon:{name:string,url:string})=>this.pokemonService.getPokemonDetails(pokemon.url));
          return forkJoin(detailRequests).pipe(
            map((pokemonDetails:any) =>{
              const pokemons: PokemonChar[] = pokemonDetails.map((detail: any) => {
                const tipos = detail.types.map((type: any) => type.type.name);
                const ataque = Math.round((detail.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat || 0) / 10) * 10;
                const defensa = Math.round((detail.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat || 0) / 10) * 10;
                const velocidad = Math.round((detail.stats.find((stat: any) => stat.stat.name === 'speed')?.base_stat || 0) / 10) * 10;

                return new PokemonChar(

                  detail.name,
                  detail.sprites.front_default,
                  tipos,
                  ataque,
                  defensa,
                  velocidad
                );
              });
              return cargaPokemonsSuccess({ pokemons });
            }),
            catchError(err => of(cargaPokemonError({payload:err})))
          );
        }),  catchError((err) => of(cargaPokemonError({payload: err})))
      ))
    )
  )
}
