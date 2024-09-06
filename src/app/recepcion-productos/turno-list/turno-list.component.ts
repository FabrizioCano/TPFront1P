import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
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
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTodosLosTurnos(); // Cargar todos los turnos inicialmente
    this.cargarJaulasDisponibles();
    this.cdr.detectChanges(); 
  }
  // Cargar todos los turnos sin aplicar filtros
  cargarTodosLosTurnos(): void {
    this.reservaService.obtenerTurnos().subscribe(turnos => {
      this.turnos = turnos;
      this.turnosFiltrados = turnos; // Mostrar todos los turnos inicialmente
    });
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
      const fechaFiltrada = formatDate(this.fechaSeleccionada, 'yyyy-MM-dd', 'en');
      this.turnosFiltrados = this.turnos.filter(turno => turno.fecha === fechaFiltrada)
        .sort((a, b) => a.horaInicioAgendamiento.localeCompare(b.horaInicioAgendamiento));
    } else {
      this.turnosFiltrados = this.turnos; 
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
  guardarHoraActual(): string {
    const fecha = new Date();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;  // Devuelve la hora en formato HH:mm
  }
  
  confirmarRecepcion(): void {
    if (this.jaulaSeleccionada && this.turnoSeleccionado) {
      const turnoSeleccionado = this.turnoSeleccionado;
  
      turnoSeleccionado.horaInicioRecepcion = this.guardarHoraActual();  
      turnoSeleccionado.idJaula = this.jaulaSeleccionada.id;
      this.jaulaSeleccionada.enUso = true;
  
      // Actualizamos el turno con la hora de inicio de recepción
      this.reservaService.actualizarTurno(turnoSeleccionado).subscribe(() => {
        this.filtrarTurnos();
      });
  
      // Actualizamos la jaula como en uso
      this.jaulasService.updateJaula(this.jaulaSeleccionada).subscribe(() => {
        this.cargarJaulasDisponibles();  // Refrescar jaulas disponibles.
      });
  
      this.modalService.dismissAll();  // Cerrar el modal después de la confirmación.
    } else {
      console.error('No se puede iniciar la recepción: turnoSeleccionado o jaulaSeleccionada es null');
    }
  }
  
  
  abrirModalRecepcion(turno: ReservaCabecera): void {
    this.turnoSeleccionado = turno;
    this.jaulasService.getJaulasLibres().subscribe(jaulas => {
      this.jaulasDisponibles = jaulas;
      this.modalService.open(this.modalRecepcion, { ariaLabelledBy: 'modal-basic-title' });
    });
  }

  finalizarRecepcion(turno: ReservaCabecera): void {
    turno.horaFinRecepcion = this.guardarHoraActual()
  
    const jaulaAsignada = this.jaulasDisponibles.find(jaula => jaula.id === turno.idJaula);
  
    if (jaulaAsignada) {
      jaulaAsignada.enUso = false;  // Marcar la jaula como disponible.
  
      this.jaulasService.updateJaula(jaulaAsignada).subscribe(() => {
        this.cargarJaulasDisponibles();
      });
    }
  
    this.reservaService.actualizarTurno(turno).subscribe(() => {
      this.filtrarTurnos();  // Actualizamos la lista de turnos.
    });
  }
  

  puedeIniciarRecepcion(turno: ReservaCabecera): boolean {
    return !turno.horaInicioRecepcion;  // Mostrar "Iniciar Recepción" solo si no se ha iniciado.
  }
  
  puedeFinalizarRecepcion(turno: ReservaCabecera): boolean {
    return !!turno.horaInicioRecepcion && !turno.horaFinRecepcion;  // Mostrar "Finalizar Recepción" solo si ha iniciado pero no ha terminado.
  }
  
  
  obtenerEstado(turno: ReservaCabecera): string {
    if (turno.horaFinRecepcion) {
      return 'completado';
    }
    if (turno.horaInicioRecepcion && !turno.horaFinRecepcion) {
      return 'en recepción';
    }
    return 'pendiente';
  }
  

  formatearHora(horaISO?: string): string {
    if (!horaISO) {
      return '-';  // Si no existe la hora, devuelves un guion.
    }
  
    const fecha = new Date(`1970-01-01T${horaISO}:00`);
    return isNaN(fecha.getTime()) ? 'Hora inválida' : fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  
  formatearFecha(fechaISO: string): string {
    if (!fechaISO) {
      return '-';
    }
    const fecha = new Date(fechaISO);
    return isNaN(fecha.getTime()) ? 'Fecha inválida' : fecha.toLocaleDateString();  // Devuelve la fecha en formato local.
  }
  
  
  
}
