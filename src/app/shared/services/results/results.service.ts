import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../tournament/tournament.service';
import { PointTableService } from '../point-table/point-table.service';

@Injectable()
export class ResultsService {
  predictionUrl: string;
  pointTableService: PointTableService;
  results$: any;
  baseurl: string;
  tournamentIds;
  constructor(private afDb: AngularFireDatabase, private tournamentService: TournamentService) {
    this.baseurl = 'letsplay';
    this.predictionUrl = this.baseurl + '/prediction';
  }

  saveResults(scheduleId, winningTeam) {
    this.afDb.list(this.baseurl + `/results/`).set(scheduleId, winningTeam)
      .then(_ => {
        this.updatePoint(scheduleId, winningTeam);
      })
  }

  getResults(scheduleId): Observable<any> {
    return this.afDb.object(this.baseurl + `/results/` + scheduleId).valueChanges();
  }

  updatePoint(scheduleId, winner) {
    let subscription = this.afDb.list(this.predictionUrl, ref =>
      ref.orderByChild('scheduleId').equalTo(scheduleId)).valueChanges()
      .subscribe(allPredictions => {
        console.log(allPredictions)
        for (let prediction of allPredictions) {
          console.log("******** PREDICTION DETAILS *********")
          console.log(prediction['uid'])
          console.log(prediction['leagueId'])
          console.log(prediction['scheduleId'])
          console.log(prediction['myPrediction'])
          let a=this.getResults(prediction['scheduleId']).subscribe(a => console.log("Actual result: " + a))
          console.log("************************************")
        }
      })
  }
}
