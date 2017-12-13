import { Component, OnInit } from '@angular/core';
import { PointTableService } from '../../shared/services/point-table/point-table.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.css']
})
export class PointTableComponent implements OnInit {
  leagueId: string;
  tournamentId: any;


  constructor(private route: ActivatedRoute, private pointTableService: PointTableService) { }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['id'];
    this.pointTableService.updatePointTable(this.tournamentId);
    // this.getPointTableData(this.tournamentId, this.leagueId);
  }
}
