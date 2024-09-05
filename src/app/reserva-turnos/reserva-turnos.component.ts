import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaCabecera, ReservaDetalle } from './reserva.model';
import { ReservaService } from './reserva.service';
import { Proveedores } from '../proveedores/proveedores';
import { Productos } from '../productos/productos';
import { Jaula } from '../jaulas/jaulas';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva-turnos.component.html',
  styleUrls: ['./reserva-turnos.component.css']
})
export class ReservaTurnosComponent implements OnInit {
  reservaForm: FormGroup;
  detalleForm: FormGroup;
  proveedores: Proveedores[] = [];
  productos: Productos[] = [];
  jaulas: Jaula[]= [];

  horasDisponibles: string[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', 
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];
  // Estructura para los detalles de la reserva
  detalles = [
    { idProducto: '', cantidad: 1 }
  ];


  constructor(private fb: FormBuilder, private reservaService: ReservaService) {
    this.reservaForm = this.fb.group({
      fecha: ['', Validators.required],
      horaInicioAgendamiento: ['', Validators.required],
      horaFinAgendamiento: ['', Validators.required],
      idProveedor: ['', Validators.required],
      idJaula: ['', Validators.required],
      horaInicioRecepcion: ['', Validators.required],
      horaFinRecepcion: ['', Validators.required]
    });

    this.detalleForm = this.fb.group({
      idProducto: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar proveedores
    this.reservaService.getProveedores().subscribe(data => {
      this.proveedores = data;
    });

    // Cargar productos
    this.reservaService.getProductos().subscribe(data => {
      this.productos = data;
    });

    // Cargar Jaulas
    this.reservaService.getJaulas().subscribe(data => {
      this.jaulas = data;
    });
  }
// Método para agregar un nuevo detalle
agregarDetalle() {
  this.detalles.push({ idProducto: '', cantidad: 1 });
}

// Método para eliminar un detalle
eliminarDetalle(index: number) {
  this.detalles.splice(index, 1);
}

onSubmit() {
  // Recoger los datos de la cabecera de la reserva
  const reserva: ReservaCabecera = this.reservaForm.value;

  // Enviar la reserva al servicio
  this.reservaService.addReserva(reserva).subscribe(response => {

    // Obtener el idTurno de la reserva recién creada (puede que lo necesites si se genera en el backend)
    const idTurno = response.id;

    // Agregar cada uno de los detalles asociados a la reserva
    this.detalles.forEach((detalle: { idProducto: string; cantidad: number; idTurno?: string }) => {
      
      // Asignar el idTurno de la reserva a cada detalle
      detalle.idTurno = idTurno || '';

      // Enviar cada detalle al servicio
      this.reservaService.addDetalle(detalle as ReservaDetalle).subscribe(detalleResponse => {
        // Obtener el id del producto recién creado
        const idProducto = detalleResponse.id;

        // Guardar el id del producto en el detalle
        detalle.idProducto = idProducto;
        detalle.cantidad = detalleResponse.cantidad;
      });
    });
  });

  alert('Reserva agregada ');
}

}
