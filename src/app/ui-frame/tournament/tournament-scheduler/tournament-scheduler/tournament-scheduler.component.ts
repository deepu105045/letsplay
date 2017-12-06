import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../../../shared/services/tournament/tournament.service';
import { Tournament } from '../../tournament';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { TimeService } from '../../../../shared/services/time/time.service';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent } from '../../../../shared/Dialog/confirmDialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Schedule } from '../../schedule';

@Component({
  selector: 'app-tournament-scheduler',
  templateUrl: './tournament-scheduler.component.html',
  styleUrls: ['./tournament-scheduler.component.css']
})
export class TournamentSchedulerComponent implements OnInit {
  schedules: any = [];
  time$: any;
  tournamentId: any;
  tournament;
  teams;
  TournamentSchedulerForm: FormGroup;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private tournamentService: TournamentService,
    private timeService: TimeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['id'];
    this.getTournamentTime();
    this.getTeams();
    this.getTournamentSchedule(this.tournamentId);
    this.createTournamentSchedulerForm();
  }

  gameLine(): FormGroup {
    return this._fb.group({
      gameDate: ['', Validators.required],
      time: ['', Validators.required],
      venue: ['', Validators.required],
      team1: ['', Validators.required],
      team2: ['', Validators.required]
    });
  }

  addGameLines(numberOfMatches) {
    const control = <FormArray>this.TournamentSchedulerForm.controls['gameLines'];
    let addrCtrl;
    for (let i = 0; i < Number(numberOfMatches); i++) {
      addrCtrl = this.gameLine();
      control.push(addrCtrl);
    }
  }

  createTournamentSchedule() {
    this.TournamentSchedulerForm.value.gameLines.forEach((gameLine) => {
      if (gameLine.team1 !== '') {
        let sch= new Schedule();
        sch.gameDate=gameLine.gameDate.toDateString();
        sch.team1=gameLine.team1;
        sch.team2 = gameLine.team2;
        sch.venue =gameLine.venue;
        sch.tournamentId = this.tournamentId

        this.tournamentService.saveTournamentSchedular(this.tournamentId,sch)
          .then(_ => {
            this.TournamentSchedulerForm.reset();
          })
      }
    });
  }

  getTournamentTime() {
    this.timeService.getTime().subscribe((time) => {
      this.time$ = time;
    })
  }

  getTeams() {
    this.tournamentService.getTournamentById(this.tournamentId)
      .subscribe(tournament => {
        this.tournament = tournament;
        this.teams = this.tournament.teams;
      });
  }

  createTournamentSchedulerForm() {
    this.TournamentSchedulerForm = this._fb.group({
      gameLines: this._fb.array([this.gameLine()])
    });
    this.addGameLines(1);
  }

  getTournamentSchedule(tournamentId) {
    this.tournamentService.getTournamentSchedule(tournamentId)
      .subscribe((schedules) => {
        this.schedules=schedules;
      })
  }

  remove(schedule) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '150px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.tournamentService.removeSchedule(this.tournamentId, schedule.scheduleId)
          .then(_ => console.log('Deleted successfully ', schedule))
          .catch(error => console.log('Error deleting schedule'));
      }
    });
  }
}
