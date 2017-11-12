import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/services/auth/auth.guard';
import { LeagueComponent } from './league/league/league.component';
import { TournamentComponent } from './tournament/tournament/tournament.component';
import { AddTournamentComponent } from './tournament/add-tournament/add-tournament.component';
import { SettingsComponent } from './settings/settings.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { TournamentSchedulerComponent } from './tournament/tournament-scheduler/tournament-scheduler/tournament-scheduler.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'league', component: LeagueComponent },
  {
    path: 'settings', component: SettingsComponent, children: [
      { path: 'tournaments', component: TournamentComponent },
      { path: 'add-tournament', component: AddTournamentComponent },
      { path: 'add-team', component: AddTeamComponent },
      { path: 'tournament-scheduler/:id', component: TournamentSchedulerComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiFrameRoutingModule { }
