import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UiFrameModule } from '../../../ui-frame/ui-frame.module';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PointTableService {
  // tournamentScheduleUrl: string;
  pointTable$: any;
  pointTableUrl: string;
  predictionUrl: string;
  baseurl: string;
  predictionObj: {};
  constructor(private afDb: AngularFireDatabase) {
    this.baseurl = 'letsplay';
    this.predictionUrl = this.baseurl + '/prediction';
    this.pointTableUrl = this.baseurl + '/point-table';
    // this.tournamentScheduleUrl = this.baseurl + '/tournament_schedule/-L-5CHaNc9wSRehFFABF';
    this.pointTable$ = this.afDb.list(this.baseurl + `/teams`);
  }

  getPointTable(tournamentId):Observable<any>{
    return this.afDb.list(this.pointTableUrl+'/'+tournamentId).snapshotChanges();
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
            let tot = 0;
            for (let p of prd) {
              if ('point' in p) {
                tot = tot + p.point;
              } 
            }
            leaguePoint[leagueId] = tot;
          })
          table[uid] = leaguePoint;
          leaguePoint = {};
        })
        this.afDb.list(this.pointTableUrl).update(tournamentId,table)
      })
  }

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
