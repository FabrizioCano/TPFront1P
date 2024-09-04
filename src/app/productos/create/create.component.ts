import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Productos } from '../productos';

@Component({
  selector: 'app-create-productos',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(private productosService:ProductosService,private router:Router){}

  providers: any[] = [];
  nextId: number = 1;
  process_data: Productos={
    id:'',
    nombre:''
  }
  ngOnInit(): void {
    this.productosService.getAll().subscribe({
      next: (data) => {
        this.providers = data;
        this.setId();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  setId(): void {
    if (this.providers.length > 0) {
      const ids = this.providers.map(provider => provider.id);
      this.nextId = Math.max(...ids) + 1;
    }
  }

  create(){
    this.process_data.id=(this.nextId).toString();
    this.productosService.createProductos(this.process_data).subscribe({
      next:(data) => {
        this.router.navigateByUrl("/productos/home");
        alert("Producto creado");
      },

      error:(err) => {
        console.log(err)
      }
    })
  }

}

