import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoListComponent } from './turno-list/turno-list.component';
import { RecepcionDetalleComponent } from './recepcion-detalle/recepcion-detalle.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecepcionProductosRoutingModule } from './recepcion-productos-routing.module';

@NgModule({
  declarations: [
    TurnoListComponent,
    RecepcionDetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RecepcionProductosRoutingModule
  ],
  exports: [
    TurnoListComponent,
    RecepcionDetalleComponent
  ]
})
export class RecepcionProductosModule { }
