import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HeaderComponent } from './header/header.component';
import { UiFrameRoutingModule } from './ui-frame-routing.module';
import { TournamentService } from '../shared/services/tournament/tournament.service';
import { SettingsComponent } from './settings/settings.component';
import { LeagueComponent } from './league/league/league.component';

@NgModule({
  imports: [
    CommonModule,
    UiFrameRoutingModule,
    AppMaterialModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    SettingsComponent,
    LeagueComponent
  ],
  providers:[
    TournamentService
  ]
})
export class UiFrameModule { }
