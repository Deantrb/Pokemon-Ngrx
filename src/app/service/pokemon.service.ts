import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http:HttpClient) { }


  getPokemons(){
    return  this.http.get("https://pokeapi.co/api/v2/pokemon/").pipe(
      delay(3000),
      map((res:any)=>res['results'])
    )
  }

  getPokemonDetails(url: string) {
    return this.http.get(url);
  }
}
