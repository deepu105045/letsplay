import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Team } from '../team';
import { TeamService } from '../../../shared/services/team/team.service';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../../../shared/services/sport/sport.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  teams: {}[];
  createTeamForm: FormGroup;
  sports$;

  constructor(private _fb: FormBuilder, private teamService: TeamService,
    private route: ActivatedRoute, private sportService: SportService) {
    this.sports$ = this.sportService.getSports();
  }
  ngOnInit() {
    this.createTeamForm = this._fb.group({
      sportId: [''],
      teamName: ['', Validators.required],
      displayName: ['', Validators.required]
    });

    const sportControl = this.createTeamForm.get('sportId');
    sportControl.valueChanges.subscribe((sportId) => { 
      this.teamService.getTeamsBySportId(sportId) 
        .subscribe((teamNames) => {
          this.teams = teamNames;
        });
    })
  }

  createTeam() {
    let sportId = this.createTeamForm.controls.sportId.value;
    let newTeam = new Team();
    newTeam.name = this.createTeamForm.controls.teamName.value;
    newTeam.displayName = this.createTeamForm.controls.displayName.value;

    this.teamService.saveTeam(sportId, newTeam)
      .then(_ => console.log('Team data sucessfully saved in firebase'))



  }

}
