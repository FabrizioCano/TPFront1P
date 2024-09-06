import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { ProductosModule } from './productos/productos.module';
import { JaulasModule } from './jaulas/jaulas.module';
import { ReservaTurnosComponent } from './reserva-turnos/reserva-turnos.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppWrapperComponent,
    ReservaTurnosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductosModule,
    ProveedoresModule,
    JaulasModule,
    RouterModule,


  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync('noop'),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
