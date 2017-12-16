import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UiFrameModule } from '../../../ui-frame/ui-frame.module';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PointTableService {
  pointTable$: any;
  pointTableUrl: string;
  predictionUrl: string;
  baseurl: string;
  predictionObj: {};
  constructor(private afDb: AngularFireDatabase) {
    this.baseurl = 'letsplay';
    this.predictionUrl = this.baseurl + '/prediction';
    this.pointTableUrl = this.baseurl + '/point-table';
    this.pointTable$ = this.afDb.list(this.baseurl + `/teams`);
  }

  getPointTable(tournamentId):Observable<any>{
    return this.afDb.list(this.pointTableUrl+'/'+tournamentId).snapshotChanges();
  }

  getPointTableByLeagueId(leagueId):Observable<any>{
    return this.afDb.list(this.pointTableUrl, ref => ref.orderByChild('leagueId').equalTo(leagueId)).valueChanges();
  }

  updatePointTable(tournamentId) {
    let subscription = this.afDb.list(this.predictionUrl, ref => ref.orderByChild('tournamentId').equalTo(tournamentId))
      .valueChanges().subscribe(allPredictions => {   
        const predictionsByUser = this.groupBy(allPredictions, prediction => prediction.uid);
        predictionsByUser.forEach((user, uid) => {
          const predictionsByUserAndLeagueId = this.groupBy(user, p => p.leagueId);
          predictionsByUserAndLeagueId.forEach((prd, leagueId) => {
            let point = 0;
            for (let p of prd) {
              if ('point' in p) {
                point = point + p.point;
              }   
            }
            this.afDb.list(this.pointTableUrl).set(leagueId+uid ,{leagueId,uid,point})
          })
        })  
        subscription.unsubscribe();     //Delete this if point not updating 

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
