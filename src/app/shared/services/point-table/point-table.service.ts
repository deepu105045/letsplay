import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ResultsService } from '../results/results.service';
@Injectable()
export class PointTableService {
  predictionUrl: string;
  leagueId: any;
  leaguesIds: any;

  pointTable$: any;
  baseurl: string;

  constructor(private afDb: AngularFireDatabase, private resultService: ResultsService) {
    this.baseurl = 'letsplay';
    this.predictionUrl = this.baseurl + '/prediction';
  }


}
