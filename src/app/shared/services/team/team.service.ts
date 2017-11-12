import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Team } from '../../../ui-frame/team/team';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../tournament/tournament.service';

@Injectable()
export class TeamService {
  teams$;
  baseurl: string;
  constructor(private afDb: AngularFireDatabase, private tournamentService: TournamentService) {
    this.baseurl = 'letsplay';
    this.teams$ = this.afDb.list(this.baseurl + `/teams`);
  }

  saveTeam(sportId: string, team: Team) {
    let pushKey = this.teams$.push().key;
    let obj = {};
    obj[this.baseurl + `/teams/${pushKey}`] = team;
    obj[this.baseurl + `/sport_teams/${sportId}/${pushKey}`] = team.name;

    return this.afDb.object('/').update(obj)
  }

  getTeams(): Observable<Team[]> {
    return this.afDb.list(this.baseurl + `/teams`).valueChanges();
  }

  getTeamsBySportId(sportId){
    return this.afDb.list(this.baseurl + '/sport_teams/'+sportId).valueChanges();
  }

  getTeamById(teamId){
    return this.afDb.list(this.baseurl + '/teams/'+teamId).valueChanges();
  }

  



 
}
