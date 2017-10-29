import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../shared/services/auth/auth.guard';
import { LeagueComponent } from './league/league/league.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent,canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent,canActivate: [AuthGuard]},
  { path: 'league',component:LeagueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiFrameRoutingModule { }
