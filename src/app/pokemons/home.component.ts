import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {cargarPokemons} from '../state/pokemon.actions';
import {PokemonChar} from '../models/pokemon.models';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  open:boolean =false
  pokemonList:PokemonChar[] =[]

  constructor(private store: Store<AppState>) {}

  ngOnInit() {

    this.store.select('pokemonList').subscribe(({pokemons})=>this.pokemonList = pokemons)

    this.store.dispatch(cargarPokemons())
  }
}
