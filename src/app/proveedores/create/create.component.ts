import { Component } from '@angular/core';
import { ProveedoresService } from '../proveedores.service';
import { Router } from '@angular/router';
import { Proveedores } from '../proveedores';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(private proveedoresService:ProveedoresService,private router:Router){}
  process_data: Proveedores={
    idProveedor:0,
    nombre:''
  }

  create(){
    this.proveedoresService.createProveedor(this.process_data).subscribe({
      next:(data) => {
        this.router.navigateByUrl("/proveedores/home");
      },
      error:(err) => {
        console.log(err)
      }
    })
  }
}
