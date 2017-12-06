import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../tournament/tournament.service';

import { PredictionService } from '../prediction/prediction.service';
import { PointTableService } from '../point-table/point-table.service';

@Injectable()
export class ResultsService {
  predictionUrl: string;
  results$: any;
  baseurl: string;
  tournamentIds;
  constructor(private afDb: AngularFireDatabase, private tournamentService: TournamentService,
    private predictionService: PredictionService, private pointTableService: PointTableService) {
    this.baseurl = 'letsplay';
    this.predictionUrl = this.baseurl + '/prediction';
  }

  saveResults(tournamentId,scheduleId, winningTeam) {
    this.afDb.list(this.baseurl + `/results/`).set(scheduleId, winningTeam)
      .then(_ => {
        this.updatePoint(scheduleId, winningTeam);
      })
      // .then(_ =>{
      //   this.pointTableService.updatePointTable(tournamentId)
      // })
  }

  getResults(scheduleId): Observable<any> {
    return this.afDb.object(this.baseurl + `/results/` + scheduleId).valueChanges();
  }

  updatePoint(scheduleId, winner) {
    let point: number;
    let subscription = this.afDb.list(this.predictionUrl, ref =>
      ref.orderByChild('scheduleId').equalTo(scheduleId)).valueChanges()
      .subscribe(allPredictions => {
        for (let prediction of allPredictions) {
          this.getResults(prediction['scheduleId']).subscribe(res => {
            prediction['result'] = res;
            prediction['myPrediction'] === res ? point = 1 : point = 0;
            prediction['point'] = point;
            this.predictionService.updatePrediction(prediction['predictionKey'],prediction)
          })
        }
      });
  }
}
