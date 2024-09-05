import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReservaService } from '../../reserva-turnos/reserva.service';
import { ReservaDetalle } from '../../reserva-turnos/reserva.model';

@Component({
  selector: 'app-recepcion-detalle',
  templateUrl: './recepcion-detalle.component.html',
  styleUrls: ['./recepcion-detalle.component.css']
})
export class RecepcionDetalleComponent implements OnChanges {
  @Input() idTurno!: string; 
  detalles: ReservaDetalle[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idTurno'] && this.idTurno !== undefined) {
      this.obtenerDetalles();
    }
  }

  obtenerDetalles(): void {
    this.reservaService.obtenerDetalles(this.idTurno).subscribe(
      (detalles: ReservaDetalle[]) => {
        this.detalles = detalles.filter(detalle => detalle.idTurno === this.idTurno); // Ensure correct type
      },
      error => {
        console.error('Error al obtener los detalles del turno', error);
      }
    );
  }
}
