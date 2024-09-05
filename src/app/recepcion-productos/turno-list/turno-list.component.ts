import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservaCabecera, ReservaDetalle } from '../../reserva.model'; // Asegúrate de que esté en el lugar correcto
import { ReservaService } from '../../reserva.service'; // Servicio para obtener los turnos
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { RecepcionDetalleComponent } from '../recepcion-detalle/recepcion-detalle.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { Jaula } from '../../jaulas/jaulas';
import { JaulasService } from '../../jaulas/jaulas.service';


@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.css']
})
export class TurnoListComponent implements OnInit {
  @ViewChild('modalRecepcion') modalRecepcion: any;
  @ViewChild('modalDetalle') modalDetalle: any;

  turnos: ReservaCabecera[] = [];
  turnosFiltrados: ReservaCabecera[] = [];
  fechaSeleccionada: string = ''; 
  proveedores: { [key: number]: string } = {}; 
  jaulasDisponibles: Jaula[] = [];
  jaulaSeleccionada: Jaula | null = null;
  turnoSeleccionado: ReservaCabecera | null = null;
  productosDelTurno: ReservaDetalle[] = [];
  

  constructor(private reservaService: ReservaService, 
    private proveedoresService: ProveedoresService, 
    private jaulasService: JaulasService, 
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fechaSeleccionada = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.cargarTurnos();
    this.cargarJaulasDisponibles();
  }

  cargarTurnos(): void {
    this.reservaService.obtenerTurnos().subscribe(turnos => {
      this.turnos = turnos;
      this.filtrarTurnos();
    });
  }

  cargarJaulasDisponibles(): void {
    this.jaulasService.getJaulasLibres().subscribe(jaulas => {
      this.jaulasDisponibles = jaulas; // Cargamos solo jaulas que no están en uso
    });
  }  

  // filtrar los turnos por fecha
  filtrarTurnos(): void {
    if (this.fechaSeleccionada) {
      this.turnosFiltrados = this.turnos
        .filter(turno => turno.fecha === this.fechaSeleccionada)
        .sort((a, b) => a.horaInicioAgendamiento.localeCompare(b.horaInicioAgendamiento));
    } else {
      this.turnosFiltrados = [];
    }
  }

  obtenerNombreProveedor(idProveedor: number): string {
    if (this.proveedores[idProveedor]) {
      return this.proveedores[idProveedor];
    }

    // la solicitud http
    this.proveedoresService.getProveedorById(idProveedor).subscribe(proveedor => {
      this.proveedores[idProveedor] = proveedor.nombre;
    }, error => {
      this.proveedores[idProveedor] = 'Desconocido'; 
    });

    return 'Cargando...'; 
  }


  obtenerJaula(idJaula?: number): string {
    return idJaula ? `Jaula ${idJaula}` : 'Sin Jaula';
  }

  verDetalles(idTurno: number): void {
    this.reservaService.obtenerDetalles(idTurno).subscribe(detalles => {
      this.productosDelTurno = detalles.filter(detalle => detalle.idTurno === idTurno);
      this.modalService.open(this.modalDetalle, { ariaLabelledBy: 'modal-basic-title' });
    });
  }
  
  confirmarRecepcion(): void {
    if (this.jaulaSeleccionada && this.turnoSeleccionado) {
      const turnoSeleccionado = this.turnoSeleccionado;
  
      // Convertir el ID de la jaula a número utilizando 'id' en lugar de 'idJaula'
      turnoSeleccionado.idJaula = parseInt(this.jaulaSeleccionada.id, 10); 
  
      // Asignar la hora de inicio de recepción
      turnoSeleccionado.horaInicioRecepcion = new Date().toISOString();
  
      // Marcar la jaula como en uso
      this.jaulaSeleccionada.enUso = true;
  
      // Actualizar el turno y la jaula en el servicio
      this.reservaService.actualizarTurno(turnoSeleccionado).subscribe(() => {
        console.log(`Recepción iniciada para el turno con ID: ${turnoSeleccionado.idTurno}`);
        this.filtrarTurnos(); // Actualizar la lista de turnos filtrados
      });
  
      this.jaulasService.updateJaula(this.jaulaSeleccionada).subscribe(() => {
        this.cargarJaulasDisponibles(); // Volver a cargar las jaulas disponibles
      });
  
      // Cerrar el modal
      this.modalService.dismissAll();
    } else {
      console.error('No se puede iniciar la recepción: turnoSeleccionado o jaulaSeleccionada es null');
    }
  }
  
  abrirModalRecepcion(turno: ReservaCabecera): void {
    this.turnoSeleccionado = turno;
    this.modalService.open(this.modalRecepcion, { ariaLabelledBy: 'modal-basic-title' });
  }

  // iniciarRecepcion(): void {
  //   if (!this.turnoSeleccionado || !this.jaulaSeleccionada) {
  //     return;
  //   }

  //   this.turnoSeleccionado.idJaula = this.jaulaSeleccionada.idJaula;
  //   this.turnoSeleccionado.horaInicioRecepcion = new Date().toISOString();

  //   this.jaulaSeleccionada.enUso = 'S';

  //   this.reservaService.actualizarTurno(this.turnoSeleccionado).subscribe(() => {
  //     console.log(`Recepción iniciada para el turno con ID: ${this.turnoSeleccionado!.idTurno}`);
  //   });

  //   this.reservaService.actualizarJaula(this.jaulaSeleccionada).subscribe(() => {
  //     console.log(`Jaula ${this.jaulaSeleccionada!.idJaula} asignada`);
  //   });
  // }

  finalizarRecepcion(turno: ReservaCabecera): void {
    turno.horaFinRecepcion = new Date().toISOString();
    
    // Convertir el ID de la jaula a número antes de comparar
    const jaulaAsignada = this.jaulasDisponibles.find(jaula => parseInt(jaula.id, 10) === turno.idJaula);
    
    if (jaulaAsignada) {
      jaulaAsignada.enUso = false; // Marca la jaula como vacía (disponible)
    }
    
    // Actualizar el turno con la hora de fin de recepción
    this.reservaService.actualizarTurno(turno).subscribe(() => {
      this.cargarTurnos(); // Refrescar los turnos
    });
    
    // Si se encontró la jaula asignada, actualizarla en el servicio
    if (jaulaAsignada) {
      this.jaulasService.updateJaula(jaulaAsignada).subscribe(() => {
        this.cargarJaulasDisponibles(); // Recargar las jaulas disponibles
      });
    }
  }
  
  
  puedeIniciarRecepcion(turno: ReservaCabecera): boolean {
    return !turno.horaInicioRecepcion; 
  }
  
  puedeFinalizarRecepcion(turno: ReservaCabecera): boolean {
    return !!turno.horaInicioRecepcion && !turno.horaFinRecepcion; 
  }

  obtenerEstado(turno: ReservaCabecera): string {
    if (turno.horaFinRecepcion) return 'completado';
    if (turno.horaInicioRecepcion) return 'en recepcion';
    return 'pendiente';
  }
  formatearHora(horaISO?: string): string {
    if (!horaISO) {
      return '-';
    }
  
    const fecha = new Date(horaISO);
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Muestra la hora en formato HH:mm
  }
  
}