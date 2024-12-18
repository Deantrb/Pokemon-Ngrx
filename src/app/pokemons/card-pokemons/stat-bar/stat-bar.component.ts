import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  standalone: false,
  template:`
    <div class="stat-bar">
      <!-- Recorremos los puntos -->
      <span
        *ngFor="let point of points; let i = index"
        [class.filled]="i < filledPoints"
        class="point">
      </span>
    </div>
  `,
  styles:`
    :host {
      display: flex;
      align-items: center;
    }

    .stat-bar {
      display: flex;
      gap: 3px;
    }

    .point {
      width: 7px;
      height: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #e0e0e0; /* Color del punto vacío */
    }
    .point.filled {
      background-color: #08A63D; /* Color del punto relleno */
    }
  `
})
export class StatBarComponent implements  OnInit{
  @Input() statValue: number = 0; // Valor de la estadística (e.g. 80)
  points: number[] = Array(10).fill(0); // Representación de los 10 puntos
  filledPoints: number = 0; // Número de puntos rellenos

  ngOnInit(): void {
    // Calcula cuántos puntos son rellenos (statValue / 10)
    this.filledPoints = Math.floor(this.statValue / 10); // Divide entre 10 para calcular puntos llenos
  }
}
