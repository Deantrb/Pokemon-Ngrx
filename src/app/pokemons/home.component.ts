import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { cargarPokemons } from '../state/pokemon.actions';
import { PokemonChar } from '../models/pokemon.models';
import { clearPokemons, getHVSPokemons } from '../state/historyvs.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VsComponent } from './modal/vs/vs.component';
import { ListComponent } from './modal/list/list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  open: boolean = false;
  pokemonList: PokemonChar[] = [];
  loader: any;

  private modalService = inject(NgbModal);
  historySub: Subscription | undefined;
  history: any;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select('pokemonList').subscribe(({ pokemons, loading }) => {
      this.pokemonList = pokemons;
      this.loader = loading;
    });

    this.historySub = this.store.select('historyVs').subscribe(({ listVS }) => {
      this.history = listVS;
      console.log(this.history.length);
    });

    this.store.dispatch(cargarPokemons());
  }

  play() {
    const rIndex1 = Math.floor(Math.random() * this.pokemonList.length);
    let rIndex2 = Math.floor(Math.random() * this.pokemonList.length);

    while (rIndex1 === rIndex2) {
      rIndex2 = Math.floor(Math.random() * this.pokemonList.length);
    }

    const winner =
      this.pokemonList[rIndex1].ataque > this.pokemonList[rIndex2].ataque
        ? this.pokemonList[rIndex1]
        : this.pokemonList[rIndex2];

    const pokeVs = {
      pokemon1: this.pokemonList[rIndex1],
      pokemon2: this.pokemonList[rIndex2],
      winner: winner.name,
    };

    this.open = !this.open;

    // Despacha la acción
    this.store.dispatch(getHVSPokemons({ pokemonsVS: pokeVs }));
    this.modalService.open(VsComponent, {
      size: 'lg',
      centered: true,
      animation: true,
      backdropClass: 'light-blue-backdrop',
    });
  }
  list() {
    this.modalService.open(ListComponent, {
      size: 'lg',
      centered: true,
      animation: true,
      backdropClass: 'light-blue-backdrop',
    });
  }

  delete(){
    this.store.dispatch(clearPokemons());
  }

}
