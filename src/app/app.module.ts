import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';


//NGRX++++++++++++++++++++++++++++++++++++++++++
import { StoreModule } from '@ngrx/store';
import {PokemonsEffects} from './state/pokemon.effects';
import {appReducers} from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { HomeComponent } from './pokemons/home.component';
import {CommonModule} from '@angular/common';
import {CardPokemonsComponent} from './pokemons/card-pokemons/card-pokemons.component';
import {StatBarComponent} from './pokemons/card-pokemons/stat-bar/stat-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardPokemonsComponent,
    StatBarComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([PokemonsEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    NgbModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
