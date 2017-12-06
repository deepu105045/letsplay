import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from "../../../../environments/environment";
import { Constants } from '../../../constants/constants';
import { Tournament } from '../../../ui-frame/tournament/tournament';
import { Schedule } from '../../../ui-frame/tournament/schedule';

@Injectable()
export class TournamentService {
  tournaments$;
  schedule$;
  baseurl: string;

  constructor(private afDb: AngularFireDatabase) {
    this.baseurl = 'letsplay';
    this.tournaments$ = this.afDb.list(this.baseurl + `/tournaments`);
    this.schedule$ = this.afDb.list(this.baseurl + '/tournament_schedule/');
  }

  getTournaments(): Observable<{}[]> {
    return this.afDb.list(this.baseurl + `/tournaments`).valueChanges();
  }

  getTournamentById(tournamentId: string): Observable<{}> {
    return this.afDb.object(this.baseurl + '/tournaments/' + tournamentId).valueChanges();
  }

  saveTournament(tournament: Tournament): Promise<any> {
    let postRef = this.tournaments$.push();
    tournament.tournamentId = postRef.key;
    return postRef.update(tournament);
  }

  saveTournamentSchedular(tournamentId, schedule: Schedule) {
    let postRef = this.schedule$.push();
    schedule.scheduleId = postRef.key;
    return this.afDb.list(this.baseurl + '/tournament_schedule/' + tournamentId).update(schedule.scheduleId, schedule);
  }

  getTournamentSchedule(tournamentId): Observable<any> {
    return this.afDb.list(this.baseurl + '/tournament_schedule/' + tournamentId).valueChanges();
  }

  removeSchedule(tournamentId, scheduleId): Promise<void> {
    return this.afDb.list(this.baseurl + '/tournament_schedule/' + tournamentId + '/' + scheduleId).remove();
  }

  getSCheduleByScheduleId(scheduleId){
    return this.afDb.list(this.baseurl +'/tournament_schedule/', ref => 
      ref.orderByChild('scheduleId').equalTo(scheduleId))
      .valueChanges()
      .subscribe( val => {
        console.log(val);
      })
  }

  getAllScheduleIds(tournamentId): Observable<any> {
    let scheduleIds = [];
    this.getTournamentSchedule(tournamentId)
      .subscribe(games => {
        games.forEach(game => {
          scheduleIds.push(game.scheduleId);
        })
      })
    return Observable.of(scheduleIds);
  }
}

