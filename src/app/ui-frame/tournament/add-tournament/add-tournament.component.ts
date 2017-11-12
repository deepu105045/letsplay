import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { SportService } from '../../../shared/services/sport/sport.service';
import { Tournament } from '../tournament';
import { TournamentService } from '../../../shared/services/tournament/tournament.service';
import { TeamService } from '../../../shared/services/team/team.service';
import { Team } from '../../team/team';
@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {
  selectedTeamsKey: string[];
  teamselected = {};
  teams: {}[];
  createTournamentForm: FormGroup;
  numberOfGames: Number;
  sports$;

  constructor(private _fb: FormBuilder,
    private sportService: SportService,
    private tournamentService: TournamentService,
    private teamService: TeamService,
    private router: Router) {
    this.sports$ = this.sportService.getSports();
  }

  ngOnInit() {
    let teamsArray = [];
    this.createTournamentForm = this._fb.group({
      tournamentName: [''],
      sport: [''],
    });

    const sportControl = this.createTournamentForm.get('sport');
    sportControl.valueChanges.subscribe((sportId) => { // listen to sport selection checkbox event
      this.teamService.getTeamsBySportId(sportId)
        .subscribe((teamNames) => {
          this.teams = teamNames;
          this.teamselected = {};
        });
    })
  }

  createTournament() {
    let newTournament = new Tournament();
    newTournament.name = this.createTournamentForm.controls.tournamentName.value;
    newTournament.sportId = this.createTournamentForm.controls.sport.value;
    newTournament.teams = this.selectedTeamsKey;

    console.log(this.createTournamentForm.controls.sport)

    this.tournamentService.saveTournament(newTournament)
      .then((_ => { this.router.navigate(['/settings/tournaments']) }))
      .catch((error) => { console.log('Error saving tournament', error) })
  }

  addToSelectedTeamList(team) {
    team in this.teamselected ?  delete this.teamselected[team] : this.teamselected[team] = team;
    this.selectedTeamsKey=Object.keys(this.teamselected);
  }

}
