import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { RegisterComponent } from './register/register/register.component';

const routes: Routes = [
  { path:'login',component: LoginComponent },
  { path:'logout',component: LogoutComponent },
  { path:'register', component: RegisterComponent },
  { path: '', component: LoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
