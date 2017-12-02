import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UiFrameModule } from '../../../ui-frame/ui-frame.module';

@Injectable()
export class PointTableService {
  tournamentScheduleUrl: string;
  pointTable$: any;
  pointTableUrl: string;
  predictionUrl: string;
  baseurl: string;
  predictionObj: {};
  constructor(private afDb: AngularFireDatabase) {
    this.baseurl = 'letsplay';
    this.predictionUrl = this.baseurl + '/prediction';
    this.pointTableUrl = this.baseurl + '/point-table';
    this.tournamentScheduleUrl = this.baseurl + '/tournament_schedule/-L-5CHaNc9wSRehFFABF';
    this.pointTable$ = this.afDb.list(this.baseurl + `/teams`);
  }

  updatePointTable(tournamentId) {
    let pushKey = this.pointTable$.push().key;
    let table = {};
    let subscription = this.afDb.list(this.predictionUrl, ref => ref.orderByChild('tournamentId').equalTo(tournamentId))
      .valueChanges().subscribe(allPredictions => {
        const predictionsByUser = this.groupBy(allPredictions, prediction => prediction.uid);
        predictionsByUser.forEach((user, uid) => {
          const predictionsByUserAndLeagueId = this.groupBy(user, p => p.leagueId);
          let leaguePoint = {};
          predictionsByUserAndLeagueId.forEach((prd, leagueId) => {
            // console.log(prd)
            let tot = 0;
            for (let p of prd) {
              console.log(p) ==> Get point exluding undefined add it and return it 
              tot = tot + p.point;
            }
            leaguePoint[leagueId] = tot;
          })
          table[uid] = leaguePoint;
          leaguePoint = {};
        })

        console.log(table)
        this.afDb.list(this.pointTableUrl).push(table)
      })
  }


  // updatePointTableByScheduleId(scheduleId) {
  //   this.afDb.list(this.predictionUrl, ref => ref.orderByChild('scheduleId').equalTo(scheduleId)).valueChanges()
  //     .subscribe((predictions) => {
  //       predictions.map( prediction => {
  //         let myUserId= prediction['uid'];
  //         let myLeagueId = prediction['leagueId'];
  //         let myPoint = prediction['point'];
  //         this.afDb.list(this.pointTableUrl).push({
  //           'uid' :prediction['uid'],
  //           'leagueId': prediction['leagueId'],
  //           'point' :  prediction['point']
  //         })
  //       })
  //     });
  // }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
    });
    return map;
  }
}
