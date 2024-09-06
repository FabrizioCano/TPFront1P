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

  constructor(private serviciosProductos: ProductosService){}

  ngOnInit(): void {
      this.serviciosProductos.getAll().subscribe((data: Productos[])=>{
        this.listproductos=data;
      });
  }

  get productosFiltrados(): Productos[] {
    return this.listproductos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  delete(id:string){
    this.serviciosProductos.deleteProductos(id).subscribe((data)=> {
      next: () => {
        this.listproductos=this.listproductos.filter(_=>_.id !=id)
        alert("Se ha borrado el Producto");
      }
    });
  }
}
