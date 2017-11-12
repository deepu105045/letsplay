import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SportService {
  sports$;
  baseurl: string;
  constructor(private afDb: AngularFireDatabase) {
    this.baseurl = 'letsplay';
   }

   getSports():Observable<any>{
     return this.afDb.list(this.baseurl + `/sport`).valueChanges();
   }
    

}
