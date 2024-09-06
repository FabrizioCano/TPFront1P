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
  constructor(private jaulasService: JaulasService) {}

  ngOnInit(): void {
    this.getJaulas();
  }

  getJaulas(): void {
    this.jaulasService.getJaulas().subscribe((data: Jaula[]) => {
      this.jaulas = data;
    });
  }

  deleteJaula(id: string): void {
    this.jaulasService.deleteJaula(id).subscribe(() => {
      this.jaulas = this.jaulas.filter(j => j.id !== id.toString());
    });
  }

  get jaulasFiltradas(): Jaula[] {
    return this.jaulas.filter(jaula => 
      jaula.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()));
  }
}
