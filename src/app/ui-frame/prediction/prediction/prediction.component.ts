import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TournamentService } from '../../../shared/services/tournament/tournament.service';
import { element } from 'protractor';
import { PredictionService } from '../../../shared/services/prediction/prediction.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  dataSource: TournamentDataSource;
  tournamentId: any;
  schedules: any = [];
  displayedColumns = ['gameDate', 'Venue', 'Team1', 'Team2','Prediction'];
  constructor(private route: ActivatedRoute, private tournamentService: TournamentService, 
    private predictionService: PredictionService) {
  }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['id'];
    this.dataSource = new TournamentDataSource(this.tournamentService, this.tournamentId);
  }

  savePrediction(element){
    console.log(element);
    this.predictionService.savePrediction(element);

  }
}

export class TournamentDataSource extends DataSource<any>{
  tournamentId;  
  constructor(private tournamentService: TournamentService, tournamentId) {
    super();
    this.tournamentId=tournamentId;
  }
  connect(): Observable<any[]> {
    return this.tournamentService.getTournamentSchedule(this.tournamentId);
  }
  disconnect() { }
}