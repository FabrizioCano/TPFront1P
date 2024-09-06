import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JaulasRoutingModule } from './jaulas-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent
  ],
  imports: [
    HomeComponent,
    CommonModule,
    JaulasRoutingModule,
    FormsModule
  ]
})
export class JaulasModule { }
