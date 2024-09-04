import { Component } from '@angular/core';
import { ProveedoresService } from '../proveedores.service';
import { Router } from '@angular/router';
import { Proveedores } from '../proveedores';

@Component({
  selector: 'app-create-proveedores',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private proveedoresService:ProveedoresService,private router:Router){}

  providers: any[] = [];
  nextId: number = 1;
  process_data: Proveedores={
    id:'',
    nombre:''
  }
  ngOnInit(): void {
    this.proveedoresService.getAll().subscribe({
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
    this.proveedoresService.createProveedor(this.process_data).subscribe({
      next:(data) => {
        this.router.navigateByUrl("/proveedores/home");
        alert("Proveedor creado");
      },

      error:(err) => {
        console.log(err)
      }
    })
  }

}
