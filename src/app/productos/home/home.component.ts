import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Productos } from '../productos';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  listproductos: Productos[]= [];
  filtroNombre: string = '';
  productosFiltrados: Productos[] = [];

  constructor(private serviciosProductos: ProductosService){}

  ngOnInit(): void {
      this.serviciosProductos.getAll().subscribe((data: Productos[])=>{
        this.listproductos=data;
        this.productosFiltrados=data;
      });
  }

  filtrarProductos() {
    const filtro = this.filtroNombre.toLowerCase(); // Convertimos a minúsculas para hacer el filtro case insensitive
    this.productosFiltrados = this.listproductos.filter((producto: Productos) =>
      producto.nombre.toLowerCase().includes(filtro)
    );
  }

  /* get productosFiltrados(): Productos[] {
    return this.listproductos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  } */

  deleteItem(id:string){
    this.serviciosProductos.deleteProductos(id).subscribe( {
      next: (data) => {
        this.listproductos=this.listproductos.filter(_=>_.id !=id)
        this.productosFiltrados = this.productosFiltrados.filter(_ => _.id != id);
      },
    })
  }
}
