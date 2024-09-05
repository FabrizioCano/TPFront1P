import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { Jaula } from '../../jaulas/jaulas';
import { JaulasService } from '../../jaulas/jaulas.service';
import { ReservaService } from '../../reserva-turnos/reserva.service';
import { ProductosService } from '../../productos/productos.service';
import { ReservaCabecera, ReservaDetalle } from '../../reserva-turnos/reserva.model';

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
  proveedores: { [key: string]: string } = {};
  jaulasDisponibles: Jaula[] = [];
  jaulaSeleccionada: Jaula | null = null;
  turnoSeleccionado: ReservaCabecera | null = null;
  productosDelTurno: ReservaDetalle[] = [];
  productosCache: { [key: string]: string } = {};

  constructor(
    private reservaService: ReservaService,
    private proveedoresService: ProveedoresService,
    private jaulasService: JaulasService,
    private productosService: ProductosService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fechaSeleccionada = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.cargarTurnos();
    this.cargarJaulasDisponibles();
  }

  cargarTurnos(): void {
    const fechaFiltrada = formatDate(this.fechaSeleccionada, 'yyyy-MM-dd', 'en');
    this.reservaService.obtenerTurnosPorFecha(fechaFiltrada).subscribe(turnos => {
      console.log('Turnos obtenidos:', turnos);
      this.turnos = turnos;
      this.filtrarTurnos();

    });
  }

  filtrarTurnos(): void {

    console.log('Fecha seleccionada:', this.fechaSeleccionada);
    console.log('Datos de turnos:', this.turnos);

    if (this.fechaSeleccionada) {

      this.turnosFiltrados = this.turnos
        .filter(turno => {
          console.log('Turno fecha:', turno.fecha);
          return turno.fecha === this.fechaSeleccionada;
        })
        .sort((a, b) => a.horaInicioAgendamiento.localeCompare(b.horaInicioAgendamiento));

      console.log('Turnos filtrados:', this.turnosFiltrados);
    } else {
      this.turnosFiltrados = [];
    }
  }


  cargarJaulasDisponibles(): void {
    this.jaulasService.getJaulasLibres().subscribe(jaulas => {
      this.jaulasDisponibles = jaulas;
    });
  }

  obtenerNombreProveedor(idProveedor: string): string {
    if (this.proveedores[idProveedor]) {
      return this.proveedores[idProveedor];
    }

    this.proveedoresService.getProveedorById(idProveedor).subscribe(proveedor => {
      this.proveedores[idProveedor] = proveedor.nombre;
    }, error => {
      this.proveedores[idProveedor] = 'Desconocido';
    });

    return 'Cargando...';
  }

  obtenerNombreProducto(idProducto: string): string {
    if (this.productosCache[idProducto]) {
      return this.productosCache[idProducto];
    }

    this.productosService.getProductoById(idProducto).subscribe(producto => {
      this.productosCache[idProducto] = producto.nombre;
    }, error => {
      this.productosCache[idProducto] = 'Desconocido';
    });

    return 'Cargando...';
  }

  obtenerJaula(idJaula?: string): string {
    return idJaula ? `Jaula ${idJaula}` : 'Sin Jaula';
  }

  verDetalles(idTurno: string): void {
    this.reservaService.obtenerDetalles(idTurno).subscribe(detalles => {
      this.productosDelTurno = detalles;
      this.modalService.open(this.modalDetalle, { ariaLabelledBy: 'modal-basic-title' });
    });
  }

  confirmarRecepcion(): void {
    if (this.jaulaSeleccionada && this.turnoSeleccionado) {
      const turnoSeleccionado = this.turnoSeleccionado;

      turnoSeleccionado.idJaula = this.jaulaSeleccionada.id;
      turnoSeleccionado.horaInicioRecepcion = new Date().toISOString();
      this.jaulaSeleccionada.enUso = true;

      this.reservaService.actualizarTurno(turnoSeleccionado).subscribe(() => {
        this.filtrarTurnos();
      });

      this.jaulasService.updateJaula(this.jaulaSeleccionada).subscribe(() => {
        this.cargarJaulasDisponibles();
      });

      this.modalService.dismissAll();
    } else {
      console.error('No se puede iniciar la recepción: turnoSeleccionado o jaulaSeleccionada es null');
    }
  }

  abrirModalRecepcion(turno: ReservaCabecera): void {
    this.turnoSeleccionado = turno;
    this.modalService.open(this.modalRecepcion, { ariaLabelledBy: 'modal-basic-title' });
  }

  finalizarRecepcion(turno: ReservaCabecera): void {
    turno.horaFinRecepcion = new Date().toISOString();

    const jaulaAsignada = this.jaulasDisponibles.find(jaula => jaula.id === turno.idJaula);

    if (jaulaAsignada) {
      jaulaAsignada.enUso = false;
    }

    this.reservaService.actualizarTurno(turno).subscribe(() => {
      this.cargarTurnos();
    });

    if (jaulaAsignada) {
      this.jaulasService.updateJaula(jaulaAsignada).subscribe(() => {
        this.cargarJaulasDisponibles();
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
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
