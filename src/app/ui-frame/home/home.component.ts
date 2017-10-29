import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../shared/services/tournament/tournament.service';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tournaments$: Observable<any>;

  constructor(private tournamentService: TournamentService) {
    this.tournaments$ = this.tournamentService.tournaments$;
   }

  ngOnInit() {
  }

}
