import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: 'proveedores/home', component:HomeComponent},
  { path: 'proveedores', redirectTo: 'proveedores/home', pathMatch: 'full' },
  { path: '', redirectTo: 'proveedores/home', pathMatch: 'full' },
  { path: 'proveedores/create', component:CreateComponent },
  { path: 'proveedores/edit/:id', component:EditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
