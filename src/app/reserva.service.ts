import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaCabecera, ReservaDetalle } from './reserva.model';
import { Jaula } from './jaulas/jaulas';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  guardarReserva(cabecera: ReservaCabecera, detalles: ReservaDetalle[]): Observable<any> {
    const reserva = { cabecera, detalles };
    return this.http.post(this.apiUrl, reserva);
  }

  obtenerTurnos(): Observable<ReservaCabecera[]> {
    return this.http.get<ReservaCabecera[]>(`${this.apiUrl}/turnos`);
  }


  // obtenerJaulasLibres(): Observable<Jaula[]> {
  //   return this.http.get<Jaula[]>(`${this.apiUrl}/jaulas?enUso=N`);
  // }


  // Actualizar el turno
  actualizarTurno(turno: ReservaCabecera): Observable<ReservaCabecera> {
    return this.http.put<ReservaCabecera>(`${this.apiUrl}/turnos/${turno.idTurno}`, turno);
  }

  // // Actualizar la jaula
  // actualizarJaula(jaula: Jaula): Observable<Jaula> {
  //   return this.http.put<Jaula>(`${this.apiUrl}/jaulas/${jaula.id}`, jaula);
  // }

  obtenerDetalles(idTurno: number): Observable<ReservaDetalle[]> {
    return this.http.get<ReservaDetalle[]>(`${this.apiUrl}/detalles?turnoId=${idTurno}`);
  }
}
