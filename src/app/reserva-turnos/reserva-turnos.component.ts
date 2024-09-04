
import { Component } from '@angular/core';
import { ReservaCabecera, ReservaDetalle } from '../reserva.model';


@Component({
  selector: 'app-reserva-turnos',
  templateUrl: './reserva-turnos.component.html',
  styleUrls: ['./reserva-turnos.component.css']
})
export class ReservaTurnosComponent {
  // Definición de las horas disponibles
  horasDisponibles: string[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', 
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  // Simulación de los proveedores disponibles
  proveedores = [
    { id: 1, nombre: 'Proveedor A' },
    { id: 2, nombre: 'Proveedor B' },
    { id: 3, nombre: 'Proveedor C' }
  ];

  // Simulación de los productos disponibles
  productos = [
    { id: 1, nombre: 'Producto X' },
    { id: 2, nombre: 'Producto Y' },
    { id: 3, nombre: 'Producto Z' }
  ];

  // Estructura de la cabecera de la reserva
  cabecera = {
    idTurno: null,
    horaInicioAgendamiento: '',
    horaFinAgendamiento: '',
    idProveedor: null,
    idJaula: null,
    horaInicioRecepcion: '',
    horaFinRecepcion: ''
  };

  // Estructura para los detalles de la reserva
  detalles = [
    { idProducto: null, cantidad: 1 }
  ];

  // Método para agregar un nuevo detalle
  agregarDetalle() {
    this.detalles.push({ idProducto: null, cantidad: 1 });
  }

  // Método para eliminar un detalle
  eliminarDetalle(index: number) {
    this.detalles.splice(index, 1);
  }

  // Método para guardar la reserva
  guardarReserva() {
    // Lógica para guardar la reserva, como enviar datos al servidor
    console.log('Reserva guardada:', this.cabecera, this.detalles);
  }
}
