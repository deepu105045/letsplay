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

   savePrediction(scheduleId){
     let postRef = this.prediction$.push();
     let pushKey= postRef.key;
     console.log(this.authService.user$);
    //return postRef.update(scheduleId);

   }


}
