import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../shared/services/tournament/tournament.service';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../tournament';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  tournaments$: Observable<{}[]>;
  // tournaments$: Observable<Tournament[]>;
  tour: Tournament;
  constructor(private tournamentService: TournamentService, private router: Router) { }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments() {
    this.tournaments$ = this.tournamentService.getTournaments();
  }

  gotoTournamentScheduler(tournament:Tournament) {
    this.router.navigate(['/settings/tournament-scheduler', tournament.tournamentId]);
  }

  gotoUpdateResults(tournament:Tournament){
    this.router.navigate(['/settings/update-results', tournament.tournamentId]);
  }

  updatePointTable(tournament:Tournament){
   this.router.navigate(['/settings/point-table', tournament.tournamentId]);
  }


}
