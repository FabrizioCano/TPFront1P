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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppWrapperComponent
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
    RouterModule

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
