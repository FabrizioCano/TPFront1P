import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from './productos';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

    constructor(private httpClient: HttpClient) {}

    getAll():Observable<Productos[]>{
      return this.httpClient.get<Productos[]>('http://localhost:3000/productos');
    }

    createProductos(data: Productos){
      return this.httpClient.post('http://localhost:3000/productos',data);
    }
    editProductos(id:number){
      return this.httpClient.get<Productos>(`http://localhost:3000/productos/${id}`);
    }

    updateProductos(data:Productos){
      return this.httpClient.put<Productos>(`http://localhost:3000/productos/${data.id}`, data);

     }

     deleteProductos(id:number){
      return this.httpClient.delete<Productos>(`http://localhost:3000/productos/${id}`);
    }

  }

