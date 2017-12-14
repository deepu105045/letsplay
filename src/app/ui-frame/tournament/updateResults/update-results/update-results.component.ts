import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../../../../shared/services/tournament/tournament.service';
import { TimeService } from '../../../../shared/services/time/time.service';
import { ResultsService } from '../../../../shared/services/results/results.service';
import { PointTableService } from '../../../../shared/services/point-table/point-table.service';

@Component({
  selector: 'app-update-results',
  templateUrl: './update-results.component.html',
  styleUrls: ['./update-results.component.css']
})
export class UpdateResultsComponent implements OnInit {
  results = {};
  schedules: any = [];
  tournamentId: any;

  constructor(private route: ActivatedRoute, private tournamentService: TournamentService,
    private resultsService: ResultsService,private router: Router,private pointTableService: PointTableService) { }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['id'];
    this.getTournamentSchedule(this.tournamentId);
  }

  getTournamentSchedule(tournamentId) {
    this.tournamentService.getTournamentSchedule(tournamentId)
      .subscribe((schedules) => {
        this.schedules = schedules;
        this.schedules.forEach(game => {
          this.resultsService.getResults(game.scheduleId).subscribe(res => {this.results[game.scheduleId] = res;})
        })
      })
  }

  saveResults(scheduleId, team) {
    this.resultsService.saveResults(this.tournamentId,scheduleId, team);
  }

   updatePointTable(){
   this.pointTableService.updatePointTable(this.tournamentId);
   
  }

}
