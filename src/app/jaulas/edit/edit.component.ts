import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JaulasService } from '../jaulas.service';
import { Jaula } from '../jaulas';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  jaula: Jaula | undefined;

  constructor(
    private jaulasService: JaulasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.jaulasService.getJaula(id).subscribe((jaula) => {
      this.jaula = jaula;
    });
  }

  updateJaula(): void {
    if (this.jaula) {
      this.jaulasService.updateJaula(this.jaula).subscribe(() => {
        this.router.navigate(['/jaulas']);
      });
    }
  }
}
