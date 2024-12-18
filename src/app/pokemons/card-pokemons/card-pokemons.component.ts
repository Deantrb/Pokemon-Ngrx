import {Component, Input} from '@angular/core';
import {PokemonChar} from '../../models/pokemon.models';

@Component({
  selector: 'app-card-pokemons',
  templateUrl: './card-pokemons.component.html',
  standalone: false,
  styleUrl: './card-pokemons.component.scss'
})
export class CardPokemonsComponent {
  @Input() pokemon:PokemonChar|undefined



}
