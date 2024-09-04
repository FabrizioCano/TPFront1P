import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JaulasService } from '../jaulas.service';
import { Jaula } from '../jaulas';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  newJaula: Jaula = { id: '', nombre: '', enUso: false };

  constructor(private jaulasService: JaulasService, private router: Router) {}

  ngOnInit(): void {
    this.generateNextId();
  }

  generateNextId(): void {
    this.jaulasService.getJaulas().subscribe((jaulas) => {
      const highestId = jaulas.length > 0 ? Math.max(...jaulas.map(j => parseInt(j.id))) : 0;
      this.newJaula.id = (highestId + 1).toString();
    });
  }

  addJaula(): void {
    this.jaulasService.addJaula(this.newJaula).subscribe(() => {
      this.router.navigate(['/jaulas']);
    });
  }
}
