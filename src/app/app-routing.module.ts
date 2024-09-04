import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { ReservaTurnosComponent } from './reserva-turnos/reserva-turnos.component';

const routes: Routes = [
    { path: '', component: AppWrapperComponent, children: [
    { path: 'proveedores', loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule) },
    { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
    { path: 'jaulas', loadChildren: () => import('./jaulas/jaulas.module').then(m => m.JaulasModule) },
    { path: 'reserva-turnos', component: ReservaTurnosComponent },
    ]},
  /* { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
