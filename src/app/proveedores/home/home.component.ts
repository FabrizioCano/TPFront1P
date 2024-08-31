import { Component, OnInit} from '@angular/core';
import { Proveedores } from '../proveedores';
import { ProveedoresService } from '../proveedores.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  listproveedores: Proveedores[]= [];
  constructor(private serviciosProveedor: ProveedoresService){}

  ngOnInit(): void {
      this.serviciosProveedor.getAll().subscribe((data: Proveedores[])=>{
        this.listproveedores=data;
      });
  }
}
