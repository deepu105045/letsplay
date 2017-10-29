import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';

import { LoginComponent } from './login/login.component';
import { AuthService } from '../shared/services/auth/auth.service';
import { LogoutComponent } from './logout/logout/logout.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, LogoutComponent],
  providers:[AuthService]
})
export class UserModule { }
