import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';

import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    AppMaterialModule
  ],
  declarations: [LoginComponent]
})
export class UserModule { }
