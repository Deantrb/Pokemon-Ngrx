import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { Subscription } from 'rxjs';
import { PokemonVs } from '../../../state/historyvs.reducers';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent   implements OnInit, OnDestroy {
  modal = inject(NgbActiveModal);
  private store = inject(Store<AppState>);
    listPoke: PokemonVs | any;
    historySub: Subscription | undefined;
    ngOnInit(): void {
      this.historySub = this.store.select('historyVs').subscribe(({ listVS }) => {
        const newMatch = Object.assign({}, listVS);
        this.listPoke = Object.values(newMatch);
        console.log(this.listPoke)
      });
    }

    ngOnDestroy(): void {
      this.historySub?.unsubscribe();
    }
}
