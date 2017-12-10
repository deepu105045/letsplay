import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Team } from '../../../ui-frame/team/team';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../tournament/tournament.service';
import * as firebase from 'firebase/app';

@Injectable()
export class TeamService {
  teamUrl: string;
  teams$;
  baseurl: string;
  private uploadTask: firebase.storage.UploadTask;
  constructor(private afDb: AngularFireDatabase, private tournamentService: TournamentService) {
    this.baseurl = 'letsplay';
    this.teamUrl = this.baseurl+'/teams';
    this.teams$ = this.afDb.list(this.baseurl + `/teams`);
  }

  saveTeam(sportId: string, team: Team) {
    let pushKey = this.teams$.push().key;
    let obj = {};
    obj[this.baseurl + `/teams/${pushKey}`] = team;
    obj[this.baseurl + `/sport_teams/${sportId}/${pushKey}`] = team.name;
    return this.afDb.object('/').update(obj).then(_ => {
      this.uploadImage(pushKey, team);
    })
  }

  uploadImage(pushKey: string, team: Team) {
    const storageRef = firebase.storage().ref('letsplay/teams/' + pushKey);
    this.uploadTask = storageRef.put(team.url);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    }, (error) => console.log('Error uploading logo to firebase ', error), () => {
      team.url = this.uploadTask.snapshot.downloadURL;
      return this.afDb.list(this.baseurl + `/teams/`).update(pushKey, team);
    })
  }

  // getTeams(): Observable<Team[]> {
  //   return this.afDb.list(this.baseurl + `/teams`).valueChanges();
  // }

  getTeamsBySportId(sportId) {
    return this.afDb.list(this.baseurl + '/sport_teams/' + sportId).snapshotChanges();
  }

  getTeamById(teamId) {
    return this.afDb.object(this.baseurl + '/teams/' + teamId).valueChanges();
  }

  getTeamByName(teamName: string):Observable<any> {
     return this.afDb.list(this.teamUrl, ref => ref.orderByChild('name').equalTo(teamName)).valueChanges();
  }
}


