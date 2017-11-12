import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HeaderComponent } from './header/header.component';
import { UiFrameRoutingModule } from './ui-frame-routing.module';
import { TournamentService } from '../shared/services/tournament/tournament.service';
import { LeagueComponent } from './league/league/league.component';
import { TournamentComponent } from './tournament/tournament/tournament.component';
import { AddTournamentComponent } from './tournament/add-tournament/add-tournament.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { SportService } from '../shared/services/sport/sport.service';
import { TeamService } from '../shared/services/team/team.service';
import { TournamentSchedulerComponent } from './tournament/tournament-scheduler/tournament-scheduler/tournament-scheduler.component';
import { TimeService } from '../shared/services/time/time.service';

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
    LeagueComponent,
    TournamentComponent,
    AddTournamentComponent,
    SettingsComponent,
    AddTeamComponent,
    TournamentSchedulerComponent,
  ],
  providers:[
    TournamentService,
    SportService,
    TeamService,
    TimeService
  ]
})
export class UiFrameModule { }
