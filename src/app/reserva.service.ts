import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaCabecera, ReservaDetalle } from './reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'https://api.ejemplo.com/reservas';

  constructor(private http: HttpClient) {}

  guardarReserva(cabecera: ReservaCabecera, detalles: ReservaDetalle[]): Observable<any> {
    const reserva = { cabecera, detalles };
    return this.http.post(this.apiUrl, reserva);
  }
}
