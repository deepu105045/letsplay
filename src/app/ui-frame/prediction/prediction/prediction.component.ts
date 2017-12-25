import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TournamentService } from '../../../shared/services/tournament/tournament.service';
import { element } from 'protractor';
import { PredictionService } from '../../../shared/services/prediction/prediction.service';
import { ResultsService } from '../../../shared/services/results/results.service';
import { LeagueService } from '../../../shared/services/league/league.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { PointTableService } from '../../../shared/services/point-table/point-table.service';
import { TeamService } from '../../../shared/services/team/team.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  pointTable$: Observable<any>;
  pointTable: any[];
  leagueName: any;
  leagueId: any;
  results = {};
  teamLogo = {};
  myPrediction = {};
  usernames ={};
  cardMode: boolean = true;

  tournamentData: any = [];
  dataSource: TournamentDataSource;
  tournamentId: any;
  tournamentName$;
  displayedColumns = ['venue', 'gameDate', 'Team1', 'Team2', 'Prediction', 'Results'];

  constructor(private route: ActivatedRoute, private tournamentService: TournamentService,
    private predictionService: PredictionService, private resultsService: ResultsService,
    private leagueService: LeagueService, private authService: AuthService,
    private pointTableService: PointTableService, private teamService: TeamService) {
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params['id'];
    this.leagueService.getLeagueById(this.leagueId).subscribe(league => {
      this.tournamentId = league.tournamentId;
      this.leagueName = league.leagueName;
      this.getTournamentName(league.tournamentId);
      this.getTournamentData(league.tournamentId);
      this.getPointTableData(this.leagueId, this.tournamentId);
      this.getTeams(league.tournamentId);
    })
  }

  getTournamentName(tournamentId) {
    this.tournamentName$ = this.tournamentService.getTournamentById(tournamentId);
  }

  getTeams(tournamentId) {
    this.tournamentService.getTournamentById(tournamentId).subscribe(
      respObj => {
        respObj['teams'].map(team => {
          this.getUrl(team);
        })
      }
    )
  }

  getUrl(teamName) {
    this.teamService.getTeamByName(teamName).subscribe(team => {
      this.teamLogo[teamName] = team[0].url;
    })
  }

  getTournamentData(tournamentId) {
    let uid = this.authService.getCurrentuser().uid;
    this.tournamentService.getTournamentSchedule(tournamentId)
      .subscribe(tournamentData => {
        this.tournamentData = tournamentData;
        this.tournamentData.forEach(game => {
          this.predictionService.getPrediction(this.leagueId, game.scheduleId)
            .subscribe(predictions => {
              predictions.map(prediction => {
                if ((prediction['scheduleId'] === game.scheduleId) && (prediction['leagueId'] === this.leagueId)) {
                  this.myPrediction[game.scheduleId] = prediction.myPrediction;
                }
              })
            })
          this.resultsService.getResults(game.scheduleId).subscribe(res => { this.results[game.scheduleId] = res; })
        })
        this.dataSource = new TournamentDataSource(tournamentData);
      })
  }

  savePrediction(scheduleId, team) {
    this.predictionService.savePrediction(this.leagueId, this.tournamentId, scheduleId, team);
  }


  getPointTableData(leagueId, tournamentId) {
     this.pointTable$=this.pointTableService.getPointTableByLeagueId(leagueId)
     let myName ;
     this.pointTableService.getPointTableByLeagueId(leagueId).subscribe(
       allUserPoints => {
        allUserPoints.forEach(userPoint => {
          this.authService.getUserProfile(userPoint.uid).subscribe(userInfo =>{
            this.usernames[userPoint.uid]= userInfo.name;
          })
        })
       }
     )
     
  }

  getUserName(uid) {
    this.authService.getUserProfile(uid).subscribe(u => {
      this.usernames[uid]=u.name;      
    })
  }

  compare(a, b) {
    if (a.point > b.point)
      return -1;
    if (a.point < b.point)
      return 1;
    return 0;
  }


  getStyle(prediction, result) {
    var color = null;
    if ((result === undefined) || (prediction === undefined)) {
      color = null;
    }
    if ((result === null) || (prediction === null)) {
      color = null;
    }
    else
      if (prediction === result)
        color = "green";
      else
        color = "red";
    return color;
  }

  isExpired(gameDate){
    let currentTimeStamp= new Date();
    return gameDate <= currentTimeStamp.toISOString();

  }

}

export class TournamentDataSource extends DataSource<any>{
  tournamentId;
  tData;
  constructor(private tournamentData) {
    super();
    this.tData = tournamentData;
  }
  connect(): Observable<any[]> {
    return Observable.of(this.tData);
  }
  disconnect() { }
}