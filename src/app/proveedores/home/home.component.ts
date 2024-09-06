import { Component, OnInit} from '@angular/core';
import { Proveedores } from '../proveedores';
import { ProveedoresService } from '../proveedores.service';
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
export class HomeComponent implements OnInit{
  listproveedores: Proveedores[]= [];
  filtroNombre: string = ''; 
  proveedoresFiltrados: Proveedores[] = [];

  constructor(private serviciosProveedor: ProveedoresService){}

  ngOnInit(): void {
      this.serviciosProveedor.getAll().subscribe((data: Proveedores[])=>{
        this.listproveedores=data;
        this.proveedoresFiltrados = data;
      });
  }

  filtrarProveedores() {
    const filtro = this.filtroNombre.toLowerCase(); // Convertimos a minúsculas para hacer el filtro case insensitive
    this.proveedoresFiltrados = this.listproveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(filtro)
    );
  }

  delete(id:string){
    this.serviciosProveedor.deleteProveedor(id).subscribe((data)=> {
      next: () => {
        this.listproveedores=this.listproveedores.filter(_=>_.id !=id)
        alert("Se ha borrado el Proveedor");
      }
    });
  }
}
