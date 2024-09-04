import { Component } from '@angular/core';
import { Jaula } from '../jaulas';
import { JaulasService } from '../jaulas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jaulas: Jaula[] = [];

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
}
