import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/take'


@Injectable()
export class PredictionService {
  predictionUrl: string;
  prediction$: any;
  baseurl: string;

  constructor(private afDb: AngularFireDatabase, private authService: AuthService) {
    this.baseurl = 'letsplay';
    this.predictionUrl= this.baseurl+'/prediction';
    this.prediction$ = this.afDb.list(this.baseurl + `/prediction`);
  }

  savePrediction(leagueId, tournamentId, scheduleId, team) {
    let postRef = this.prediction$.push();
    let key = postRef.key;
    let uid = this.authService.getCurrentuser().uid;
    let prediction = {};
    let keyToUpdate;
    prediction["leagueId"] = leagueId;
    prediction["tournamentId"] = tournamentId;
    prediction["scheduleId"] = scheduleId;
    prediction["myPrediction"] = team;
    prediction["uid"] = uid;
    let existingRecord: boolean = false;

    let subscription = this.afDb.list(this.predictionUrl, ref => ref.orderByChild('uid').equalTo(uid)).valueChanges()
      .subscribe(myPrds => {
        subscription.unsubscribe();
        for (let myP of myPrds) {
          if ((myP["leagueId"] === leagueId) && (myP["scheduleId"] === scheduleId)) {
            existingRecord = true;
            keyToUpdate = myP['predictionKey'];
            break;
          }
        }
        if (existingRecord) {
          return this.afDb.list(this.predictionUrl).update(keyToUpdate, prediction)
        } else {
          prediction["predictionKey"] = key;
          return this.afDb.list(this.predictionUrl).update(key, prediction)
        }
      })
  }

  getPrediction(leagueId, scheduleId): Observable<any> {
    let uid = this.authService.getCurrentuser().uid;
    return this.afDb.list(this.predictionUrl, ref => ref.orderByChild('uid').equalTo(uid)).valueChanges();
  }

  updatePrediction(predictionKey, prediction){
    return this.afDb.list(this.predictionUrl).update(predictionKey,prediction);
  }

}
