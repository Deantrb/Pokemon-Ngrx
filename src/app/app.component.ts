import { Component } from '@angular/core';
import {PokemonService} from './service/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokemon-redux';
}
