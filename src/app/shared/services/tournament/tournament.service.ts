import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from "../../../../environments/environment";
import { Constants } from '../../../constants/constants';
import { Tournament } from '../../../ui-frame/tournament/tournament';

@Injectable()
export class TournamentService {
  tournaments$;
  schedule$;
  baseurl: string;

  constructor(private afDb: AngularFireDatabase) {
    this.baseurl = 'letsplay';
    this.tournaments$ = this.afDb.list(this.baseurl + `/tournaments`);
    this.schedule$ = this.afDb.list(this.baseurl+'/tournament_schedule/');
  }

  getTournaments(): Observable<Tournament[]> {
    return this.afDb.list(this.baseurl + `/tournaments`).valueChanges();
  }

  getTournamentById(tournamentId:string){
    return this.afDb.object(this.baseurl+'/tournaments/'+ tournamentId).valueChanges();
  }

  saveTournament(tournament:Tournament):Promise<any>{
    let postRef= this.tournaments$.push();
    tournament.tournamentId=postRef.key;
    return postRef.update(tournament);
  }

  saveTournamentSchedular(tournamentId,schedule){
    return this.afDb.list(this.baseurl+'/tournament_schedule/'+tournamentId).push(schedule);
  }

  getTournamentSchedule(tournamentId):Observable<any>{
    return this.afDb.list(this.baseurl+'/tournament_schedule/'+tournamentId).snapshotChanges();
  }

  removeSchedule(tournamentId, scheduleId):Promise<void>{
    return this.afDb.list(this.baseurl+'/tournament_schedule/'+tournamentId+'/'+ scheduleId).remove();
  }
}

