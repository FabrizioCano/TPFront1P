import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Productos } from '../productos';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(private productosService:ProductosService, private router:Router,private route:ActivatedRoute){}

  process_data:Productos = {
    id:'',
    nombre:''
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id')!;
      this.getById(id);
    });
    }
  getById(id:string){
    this.productosService.editProductos(id).subscribe((data)=>{
      this.process_data=data;
    });
  }

  update(){
    this.productosService.updateProductos(this.process_data).subscribe({
      next:(data) => {
        this.router.navigateByUrl("/productos/home");
      },
      error:(err) => {
        console.log(err)
      }
    });
  }
}
