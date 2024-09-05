import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaCabecera, ReservaDetalle } from './reserva.model';
import { Proveedores } from '../proveedores/proveedores';
import { Productos } from '../productos/productos';
import { Jaula } from '../jaulas/jaulas';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtener proveedores
  getProveedores(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(`${this.apiUrl}/proveedores`);
  }

  // Obtener productos
  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.apiUrl}/productos`);
  }

  // Obtener productos
  getJaulas(): Observable<Jaula[]> {
    return this.http.get<Jaula[]>(`${this.apiUrl}/jaulas`);
  }

  // Guardar reserva
  addReserva(reserva: ReservaCabecera): Observable<ReservaCabecera> {
    return this.http.post<ReservaCabecera>(`${this.apiUrl}/reservas`, reserva);
  }

  // Guardar detalle
  addDetalle(detalle: ReservaDetalle): Observable<ReservaDetalle> {
    return this.http.post<ReservaDetalle>(`${this.apiUrl}/detalles`, detalle);
  }

  obtenerTurnos(): Observable<ReservaCabecera[]> {
    return this.http.get<ReservaCabecera[]>(`${this.apiUrl}`);
  }

  obtenerDetalles(idTurno: string): Observable<ReservaDetalle[]> {
    return this.http.get<ReservaDetalle[]>(`${this.apiUrl}/${idTurno}/detalles`);
  }

  actualizarTurno(turno: ReservaCabecera): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${turno.id}`, turno);
  }
  obtenerTurnosPorFecha(fecha: string): Observable<ReservaCabecera[]> {
    return this.http.get<ReservaCabecera[]>(`${this.apiUrl}/reservas?fecha=${fecha}`);
  }
}
