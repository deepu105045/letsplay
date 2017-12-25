import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../../shared/services/league/league.service';
import { League } from '../../league';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-league',
  templateUrl: './view-league.component.html',
  styleUrls: ['./view-league.component.css']
})
export class ViewLeagueComponent implements OnInit {
  league$;
  constructor(private leagueService: LeagueService,private router:Router) { }

  ngOnInit() {
    this.getleagues();
  }

  getleagues() {
    this.league$ = this.leagueService.getLeague();
  }
  onClick(league: League) {
    this.router.navigate(['/letsplay/prediction',league.leagueId])
  }

}
