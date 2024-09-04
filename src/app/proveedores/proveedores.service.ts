import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedores } from './proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private httpClient: HttpClient) {}

  getAll():Observable<Proveedores[]>{
    return this.httpClient.get<Proveedores[]>('http://localhost:3000/proveedores');
  }

  createProveedor(data: Proveedores){
    return this.httpClient.post('http://localhost:3000/proveedores',data);
  }
  editProveedor(id:string){
    return this.httpClient.get<Proveedores>(`http://localhost:3000/proveedores/${id}`);
  }

  updateProveedor(data:Proveedores){
    return this.httpClient.put<Proveedores>(`http://localhost:3000/proveedores/${data.id}`, data);

   }

   deleteProveedor(id:string){
    return this.httpClient.delete<Proveedores>(`http://localhost:3000/proveedores/${id}`);
  }
  
  getProveedorById(id: number): Observable<Proveedores> {
    return this.httpClient.get<Proveedores>(`http://localhost:3000/proveedores/${id}`);
  }
}
