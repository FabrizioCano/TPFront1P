import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Productos } from '../productos';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  listproductos: Productos[]= [];
  constructor(private serviciosProductos: ProductosService){}

  ngOnInit(): void {
      this.serviciosProductos.getAll().subscribe((data: Productos[])=>{
        this.listproductos=data;
      });
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
