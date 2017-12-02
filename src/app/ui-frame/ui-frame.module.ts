import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HeaderComponent } from './header/header.component';
import { UiFrameRoutingModule } from './ui-frame-routing.module';
import { TournamentService } from '../shared/services/tournament/tournament.service';
import { TournamentComponent } from './tournament/tournament/tournament.component';
import { AddTournamentComponent } from './tournament/add-tournament/add-tournament.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { SportService } from '../shared/services/sport/sport.service';
import { TeamService } from '../shared/services/team/team.service';
import { TournamentSchedulerComponent } from './tournament/tournament-scheduler/tournament-scheduler/tournament-scheduler.component';
import { TimeService } from '../shared/services/time/time.service';
import { CreateLeagueComponent } from './league/create-league/create-league.component';
import { LeagueService } from '../shared/services/league/league.service';
import { ViewLeagueComponent } from './league/view-league/view-league/view-league.component';
import { PredictionComponent } from './prediction/prediction/prediction.component';
import { PredictionService } from '../shared/services/prediction/prediction.service';
import { UpdateResultsComponent } from './tournament/updateResults/update-results/update-results.component';
import { ResultsService } from '../shared/services/results/results.service';
import { PointTableService } from '../shared/services/point-table/point-table.service';
import { PointTableComponent } from './point-table/point-table.component';

@NgModule({
  imports: [
    CommonModule,
    UiFrameRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    TournamentComponent,
    AddTournamentComponent,
    SettingsComponent,
    AddTeamComponent,
    TournamentSchedulerComponent,
    CreateLeagueComponent,
    ViewLeagueComponent,
    PredictionComponent,
    UpdateResultsComponent,
    PointTableComponent,
  ],
  providers:[
    TournamentService,
    SportService,
    TeamService,
    TimeService,
    LeagueService,
    PredictionService,
    ResultsService,
    PointTableService
  ]
})
export class UiFrameModule { }
