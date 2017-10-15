import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HomeComponent,
    HeaderComponent
  ]
})
export class HomeModule { }
