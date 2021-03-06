import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/services/auth/auth.guard';
import { TournamentComponent } from './tournament/tournament/tournament.component';
import { AddTournamentComponent } from './tournament/add-tournament/add-tournament.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { TournamentSchedulerComponent } from './tournament/tournament-scheduler/tournament-scheduler/tournament-scheduler.component';
import { CreateLeagueComponent } from './league/create-league/create-league.component';
import { PredictionComponent } from './prediction/prediction/prediction.component';
import { UpdateResultsComponent } from './tournament/updateResults/update-results/update-results.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'prediction/:id', component: PredictionComponent, canActivate: [AuthGuard] },
  { path: 'tournaments', component: TournamentComponent , canActivate: [AuthGuard]},
  { path: 'add-tournament', component: AddTournamentComponent, canActivate: [AuthGuard] },
  { path: 'add-team', component: AddTeamComponent , canActivate: [AuthGuard]},
  { path: 'tournament-scheduler/:id', component: TournamentSchedulerComponent , canActivate: [AuthGuard]},
  { path: 'create-league', component: CreateLeagueComponent , canActivate: [AuthGuard]},
  { path: 'update-results/:id', component: UpdateResultsComponent , canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiFrameRoutingModule { }
