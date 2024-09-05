import { Component, Input, OnInit } from '@angular/core';
import { ReservaService } from '../../reserva.service';
import { ReservaDetalle } from '../../reserva.model';

@Component({
  selector: 'app-recepcion-detalle',
  templateUrl: './recepcion-detalle.component.html',
  styleUrls: ['./recepcion-detalle.component.css']
})
export class RecepcionDetalleComponent implements OnInit {
  @Input() idTurno!: number;
  detalles: ReservaDetalle[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.obtenerDetalles();
  }

  obtenerDetalles(): void {
    this.reservaService.obtenerDetalles(this.idTurno).subscribe((detalles: ReservaDetalle[]) => {
      // Filtra los detalles en el frontend, si es necesario
      this.detalles = detalles.filter(detalle => detalle.idTurno === this.idTurno);
    }, error => {
      console.error('Error al obtener los detalles del turno', error);
    });
  }
  
}
