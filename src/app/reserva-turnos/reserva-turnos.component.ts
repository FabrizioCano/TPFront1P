import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ReservaService } from './reserva.service';
import { Proveedores } from '../proveedores/proveedores';
import { Productos } from '../productos/productos';
import { Jaula } from '../jaulas/jaulas';
import { ReservaCabecera, ReservaDetalle } from './reserva.model';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva-turnos.component.html',
  styleUrls: ['./reserva-turnos.component.css']
})
export class ReservaTurnosComponent implements OnInit {
  reservaForm: FormGroup;
  proveedores: Proveedores[] = [];
  productos: Productos[] = [];
  jaulas: Jaula[] = [];

  horasDisponibles: string[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  constructor(private fb: FormBuilder, private reservaService: ReservaService) {
    this.reservaForm = this.fb.group({
      fecha: ['', Validators.required],
      horaInicioAgendamiento: ['', Validators.required],
      horaFinAgendamiento: ['', Validators.required],
      idProveedor: ['', Validators.required],
      idJaula: ['', Validators.required],
      horaInicioRecepcion: ['', Validators.required],
      horaFinRecepcion: ['', Validators.required],
      detalles_res: this.fb.array([])
    });
  }

  get detalles_res(): FormArray {
    return this.reservaForm.get('detalles_res') as FormArray;
  }

  ngOnInit(): void {
    this.reservaService.getProveedores().subscribe(data => {
      this.proveedores = data;
    });

    this.reservaService.getProductos().subscribe(data => {
      this.productos = data;
    });

    this.reservaService.getJaulas().subscribe(data => {
      this.jaulas = data;
    });
  }

  agregarDetalle() {
    const detalleForm = this.fb.group({
      idProducto: ['', Validators.required],
      cantidad: [1, Validators.required],
    });

    this.detalles_res.push(detalleForm);
  }

  eliminarDetalle(index: number) {
    this.detalles_res.removeAt(index);
  }

  onSubmit() {

    const reserva: ReservaCabecera = this.reservaForm.value;

    const detalles = reserva.detalles_res.map((detalle: any) => {
      const { idTurno, ...rest } = detalle;
      return rest;
    });

    const reservaData = { ...reserva, detalles_res: detalles };

    this.reservaService.addReserva(reservaData).subscribe(response => {
      const idTurno = response.id;


      const detallesConTurno = reserva.detalles_res.map((detalle: any) => ({
        ...detalle,
        idTurno: idTurno
      }));


      detallesConTurno.forEach((detalle: ReservaDetalle) => {
        this.reservaService.addDetalle(detalle).subscribe(detalleResponse => {

        });
      });

      alert('Reserva agregada');
    });
  }


}
