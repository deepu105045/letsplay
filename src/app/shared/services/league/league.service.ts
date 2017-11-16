import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { League } from '../../../ui-frame/league/league';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LeagueService {
  league$;
  baseurl: string;
  constructor(private afDb: AngularFireDatabase) {
    this.baseurl = 'letsplay';
    this.league$ = this.afDb.list(this.baseurl + `/league`);
  }

  createLeague(league:League){
    let postRef= this.league$.push();
    league.leagueId=postRef.key;
    return postRef.update(league);
  }

  getLeague():Observable<any>{
    return this.afDb.list(this.baseurl + `/league`).valueChanges();
  }


}
