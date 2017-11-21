import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimeService {
  baseurl: string;

  constructor(private afDb: AngularFireDatabase) {
    this.baseurl = 'letsplay';
  }

  getTime():Observable<any>{
    return this.afDb.list(this.baseurl + `/time`).valueChanges();
  }

}
