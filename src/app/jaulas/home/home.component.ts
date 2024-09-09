import { Component, OnInit } from '@angular/core';
import { Jaula } from '../jaulas';
import { JaulasService } from '../jaulas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  jaulas: Jaula[] = [];
  filtroNombre: string = ''
  jaulasFiltradas: Jaula[] = [];
  constructor(private jaulasService: JaulasService) {}

  ngOnInit(): void {
    this.getJaulas();
  }

  getJaulas(): void {
    this.jaulasService.getJaulas().subscribe((data: Jaula[]) => {
      this.jaulas = data;
      this.jaulasFiltradas = data;
    });
  }

  deleteJaula(id:string){
    this.jaulasService.deleteJaula(id).subscribe( {
      next: (data) => {
        this.jaulas=this.jaulas.filter(_=>_.id !=id)
        this.jaulasFiltradas = this.jaulasFiltradas.filter(_ => _.id != id);
      },
    })
  }

  filtrarJaulas() {
    const filtro = this.filtroNombre.toLowerCase(); // Convertimos a minúsculas para hacer el filtro case insensitive
    this.jaulasFiltradas = this.jaulas.filter((jaulas: Jaula) =>
      jaulas.nombre.toLowerCase().includes(filtro)
    );
  }
}
