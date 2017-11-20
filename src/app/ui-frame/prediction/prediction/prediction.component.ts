import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TournamentService } from '../../../shared/services/tournament/tournament.service';
import { element } from 'protractor';
import { PredictionService } from '../../../shared/services/prediction/prediction.service';
import { ResultsService } from '../../../shared/services/results/results.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  results = {};
  tournamentData: any = [];
  dataSource: TournamentDataSource;
  tournamentId: any;
  myPrediction = {};
  tournamentName;
  displayedColumns = ['gameDate', 'Team1', 'Team2', 'Prediction', 'Results'];
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService,
    private predictionService: PredictionService, private resultsService:ResultsService) {
  }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['id'];
    this.tournamentService.getTournamentById(this.tournamentId).subscribe(tour=>this.tournamentName=tour.name)
    this.tournamentService.getTournamentSchedule(this.tournamentId)
      .subscribe(tournamentData => {
        this.tournamentData = tournamentData;
        this.tournamentData.forEach(game => {
          this.predictionService.getPrediction(this.tournamentId, game.scheduleId)
            .subscribe(prd => {this.myPrediction[game.scheduleId] = prd})
          this.resultsService.getResults(game.scheduleId).subscribe(res =>{ this.results[game.scheduleId] = res;})
        })
        this.dataSource = new TournamentDataSource(tournamentData);
      })
  }

  savePrediction(scheduleId, team) {
    this.predictionService.savePrediction(this.tournamentId, scheduleId, team);
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