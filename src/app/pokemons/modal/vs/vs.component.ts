import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PokemonVs } from '../../../state/historyvs.reducers';

@Component({
  selector: 'app-vs',
  standalone: false,
  styles: `
  .pokemons-vs{
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    padding: 40px 0px;
  }
  .card{
    width:35%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    border:2px solid gray;
    transition: box-shadow 1s ease-in-out ,border 1s ease-in,  transform 1s ease-in-out, background 1s ease-in-out;

  }

  .card-pokemon{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    padding: 20px;
    transition: box-shadow 1s ease-in-out ,border 1s ease-in,  transform 1s ease-in-out, background 1s ease-in-out;

  }
  .lostcard{border: 2px solid red;}
  .winncard{border: 2px solid green;}
  .info-pokemon{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 20px 0px 20px;
  }
  .p{
    display: flex;
    padding:0px;
    justify-content: space-between;
    width: 100%;
  }
  .title{
    font-size: 20px;
    font-family: fantasy;
    letter-spacing: 2px;
    padding:0px
  }
  .winner{
    border:2px solid green;
    background: #acffac3d;
    transform: translateY(-18px);
    box-shadow: rgba(0, 128, 0, 0.4) 0px 5px, rgba(0, 128, 0, 0.3) 0px 10px, rgba(0, 128, 0, 0.2) 0px 15px, rgba(0, 128, 0, 0.1) 0px 20px, rgba(0, 128, 0, 0.05) 0px 25px;
  }
  .lost{
    border:2px solid red;
    background:rgba(255, 172, 172, 0.24);

  }
  .title-winner{
    color:green;
    font-size:18px;
    font-family: fantasy;
  }
  `,
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">
        {{ listPoke[0].name | titlecase }} Vs
        {{ listPoke[1].name | titlecase }}
      </h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <div class="pokemons-vs">
        @for (pokemon of listPoke; track $index) {

        <div class="card" [class.winner]="winner === pokemon.name" [class.lost]="winner !== pokemon.name">
          <h5 class="title-winner" *ngIf="winner === pokemon.name">WINNER!</h5>
          <div class="card-pokemon" [class.winncard]="winner === pokemon.name" [class.lostcard]="winner !== pokemon.name">
            <img [src]="pokemon.avatar" alt="" />
            <p class="title">{{ pokemon.name | uppercase }}</p>
          </div>
          <div class="info-pokemon">
            <p class="p"><strong>Ataque:</strong>{{ pokemon.ataque }}</p>
            <p class="p"><strong>Defensa:</strong>{{ pokemon.defensa }}</p>
            <p class="p"><strong>velocidad:</strong>{{ pokemon.velocidad }}</p>
          </div>
        </div>

        }
      </div>
    </div>
  `,
})
export class VsComponent implements OnInit, OnDestroy {
  modal = inject(NgbActiveModal);
  private store = inject(Store<AppState>);
  listPoke: PokemonVs | any;
  historySub: Subscription | undefined;
  winner: any;

  ngOnInit(): void {
    this.historySub = this.store.select('historyVs').subscribe(({ listVS }) => {
      const newList = Object.assign({}, listVS[listVS.length - 1]);
      this.winner = newList.winner;
      delete newList.winner; // Ahora puedes eliminar 'winner'
      this.listPoke = Object.values(newList);
    });
  }

  ngOnDestroy(): void {
    this.historySub?.unsubscribe();
  }
}
