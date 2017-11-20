import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../tournament/tournament.service';

@Injectable()
export class ResultsService {
  results$: any;
  baseurl: string;
  tournamentIds;
  constructor(private afDb: AngularFireDatabase, private tournamentService: TournamentService) {
    this.baseurl = 'letsplay';
  }

  saveResults(tournamentId,scheduleId, winningTeam) {
    this.afDb.list(this.baseurl + `/results/`).set(scheduleId, winningTeam)
      .then(_ =>{
        this.updatePoint(tournamentId);
      })
  }

  getResults(scheduleId): Observable<any> {
    return this.afDb.object(this.baseurl + `/results/` + scheduleId).valueChanges();
  }

  updatePoint(tournamentId){
    this.tournamentService.getAllScheduleIds(tournamentId).subscribe(tournamentIds=>this.tournamentIds=tournamentIds)
    this.afDb.list(this.baseurl+'/prediction/'+tournamentId).snapshotChanges()
       .subscribe( predictions =>{
          predictions.forEach((prediction)=>{
            // console.log(prediction.payload.key)
            // console.log(prediction.payload.val())
          })
        })
  }

}
