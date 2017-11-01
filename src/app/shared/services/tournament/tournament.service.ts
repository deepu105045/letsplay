import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class TournamentService {
  tournaments$: Observable<any>;

  constructor(private afDb: AngularFireDatabase) {
    this.tournaments$= this.afDb.list(`prediction-app/tournaments`).valueChanges();
   }



   

}

