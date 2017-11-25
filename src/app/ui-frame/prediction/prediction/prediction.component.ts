import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TournamentService } from '../../../shared/services/tournament/tournament.service';
import { element } from 'protractor';
import { PredictionService } from '../../../shared/services/prediction/prediction.service';
import { ResultsService } from '../../../shared/services/results/results.service';
import { LeagueService } from '../../../shared/services/league/league.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  leagueName: any;
  leagueId: any;
  results = {};
  tournamentData: any = [];
  dataSource: TournamentDataSource;
  tournamentId: any;
  myPrediction = {};
  tournamentName;
  displayedColumns = ['gameDate', 'Team1', 'Team2', 'Prediction', 'Results'];
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService,
    private predictionService: PredictionService, private resultsService: ResultsService,
    private leagueService: LeagueService, private authService: AuthService) {
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params['id'];

    this.leagueService.getLeagueById(this.leagueId).subscribe(league => {
      this.tournamentId = league.tournamentId;
      this.leagueName = league.leagueName;
      this.getTournamentName(league.tournamentId);
      this.getTournamentData(league.tournamentId);
    })
  }

  getTournamentName(tournamentId) {
    this.tournamentService.getTournamentById(tournamentId).subscribe(tour => this.tournamentName = tour)
  }

  getTournamentData(tournamentId) {
    let uid = this.authService.getCurrentuser().uid;
    this.tournamentService.getTournamentSchedule(tournamentId) 
      .subscribe(tournamentData => {
        this.tournamentData = tournamentData;
        this.tournamentData.forEach(game => {
          this.predictionService.getPrediction(this.leagueId, game.scheduleId)
            .subscribe(predictions => {
              predictions.map(prediction => {
                if ((prediction['scheduleId'] === game.scheduleId) && (prediction['leagueId'] === this.leagueId)) {
                  this.myPrediction[game.scheduleId] = prediction.team;
                }
              })
            })
          this.resultsService.getResults(game.scheduleId).subscribe(res => { this.results[game.scheduleId] = res; })
        })
        this.dataSource = new TournamentDataSource(tournamentData);
      })

  }

  savePrediction(scheduleId, team) {
    this.predictionService.savePrediction(this.leagueId, this.tournamentId, scheduleId, team);
  }
}

export class TournamentDataSource extends DataSource<any>{
  tournamentId;
  tData;
  constructor(private tournamentData) {
    super();
    this.tData = tournamentData;
  }
  connect(): Observable<any[]> {
    return Observable.of(this.tData);
  }
  disconnect() { }
}