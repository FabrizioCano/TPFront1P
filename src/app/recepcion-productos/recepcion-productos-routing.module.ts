import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnoListComponent } from './turno-list/turno-list.component'; // Importar el componente para usar en las rutas

const routes: Routes = [
  { path: '', component: TurnoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionProductosRoutingModule { }