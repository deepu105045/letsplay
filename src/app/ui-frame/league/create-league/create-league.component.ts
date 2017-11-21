import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../shared/services/tournament/tournament.service';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../../tournament/tournament';
import { FormGroup, FormBuilder } from '@angular/forms';
import { League } from '../league';
import { LeagueService } from '../../../shared/services/league/league.service';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})
export class CreateLeagueComponent implements OnInit {
  tournaments$: Observable<Tournament[]>;
  createLeagueForm: FormGroup;
  constructor(private tournamentService: TournamentService, private leagueService:LeagueService, private _fb:FormBuilder) { }

  ngOnInit() {
    this.getTournaments();
    this.createLeagueForm=this._fb.group({
      leageueName:[],
      tournamentName:[]
    })
  }

  getTournaments() {
    this.tournaments$ = this.tournamentService.getTournaments();
  }

  onSubmit(){
     let league = new League();
     league.leagueName=this.createLeagueForm.controls.leageueName.value;
     league.tournamentName=this.createLeagueForm.controls.tournamentName.value.name;
     league.tournamentId=this.createLeagueForm.controls.tournamentName.value.tournamentId;
     this.leagueService.createLeague(league)
  }

}
