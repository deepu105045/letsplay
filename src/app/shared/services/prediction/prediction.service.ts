import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PredictionService {
  prediction$: any;
  baseurl: string;
  
  constructor(private afDb: AngularFireDatabase , private authService: AuthService) {
    this.baseurl = 'letsplay';
    this.prediction$ = this.afDb.list(this.baseurl + `/prediction`);
   }

   savePrediction(tournamentId,scheduleId, team){
     let postRef = this.prediction$.push();
     let uid= this.authService.getCurrentuser().uid;
     return this.afDb.list(this.baseurl + `/prediction/`+tournamentId+'/'+uid).set(scheduleId,team);     
   }

   getPrediction(tournamentId,scheduleId):Observable<any>{
     let uid= this.authService.getCurrentuser().uid;
     return this.afDb.object(this.baseurl + `/prediction/`+tournamentId+'/'+uid+'/'+scheduleId).valueChanges();
   }
}
