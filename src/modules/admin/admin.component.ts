import {Component, Input} from "@angular/core";
import {MdDialogRef, MdDialog} from "@angular/material";
import {BowlingLeaguesService} from "../../services/bowling/bowling-leagues.service";
import {OpenBowlingService} from "../../services/bowling/open-bowling.service";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {BowlingLeague} from "../../domain/bowling-league.domain";
import {OpenBowling} from "../../domain/open-bowling.domain";
import {VolleyballLeague} from "../../domain/volleyball-league.domain";
import {NewsService} from "../../services/news/news.service";
import {News} from "../../domain/news.domain";
import {AdminService} from '../../services/admin/admin.service';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html'
})

export class AdminComponent {

  adminPages = ADMIN_PAGES;
  selectedPage = '';
  bowlingLeagues : BowlingLeague[];
  openBowlingTimes : OpenBowling[];
  volleyballLeagues : VolleyballLeague[];
  loadingBowlingLeagueData : boolean = false;
  loadingOpenBowlingData : boolean = false;
  loadingVolleyballData : boolean = false;
  news : News[];

  constructor(public dialog: MdDialog, private bowlingLeaguesService : BowlingLeaguesService,
              private openBowlingService : OpenBowlingService, private volleyballLeaguesService : VolleyballLeaguesService,
              private newsService : NewsService, private userService : AdminService) {}

  selectAdminPage(page : string) {
    this.selectedPage = page;
    if (page === 'Bowling Leagues') {
      this.refreshBowlingLeagues();
    }
    else if (page === 'Open Bowling') {
      this.loadingOpenBowlingData = true;
      this.openBowlingService.getOpenBowlingTimes()
        .retry(2)
        .finally(() => this.loadingOpenBowlingData = false)
        .subscribe(openBowling =>{
          this.openBowlingTimes = openBowling;
        });
    }
    else if (page === 'Volleyball') {
      this.loadingVolleyballData = true;
      this.volleyballLeaguesService.getLeagues()
        .retry(2)
        .finally(() => this.loadingVolleyballData = false)
        .subscribe(volleyballLeagues =>{
          this.volleyballLeagues = volleyballLeagues;
        });
    }
    else if (page === 'News') {
      this.newsService.getNews()
        .retry(2)
        .subscribe(news =>{
          this.news = news;
        });
    }
  }

  private refreshBowlingLeagues() {
    this.loadingBowlingLeagueData = true;
    this.bowlingLeaguesService.getLeagues()
        .retry(2)
        .finally(() => this.loadingBowlingLeagueData = false)
        .subscribe(bowlingLeagues => {
          this.bowlingLeagues = bowlingLeagues;
        });
  }

  saveBowlingLeagues() {
    this.bowlingLeaguesService.saveLeagues(this.bowlingLeagues);
  }

  saveOpenBowling() {
    this.openBowlingService.saveOpenBowling(this.openBowlingTimes);
  }

  saveLeagues() {
    this.volleyballLeaguesService.saveLeagues(this.volleyballLeagues);
  }

  fileChange(event, league : BowlingLeague) {
    let filename = event[0].name;
    league.url = 'uploads/' + filename;
    let response = this.bowlingLeaguesService.uploadFile(event);
    console.log(response);
    this.saveBowlingLeagues();
    this.refreshBowlingLeagues();
  }

}

const ADMIN_PAGES : string[] = [
  'Bowling Leagues',
  'Open Bowling',
  'Volleyball',
  'News',
  'Wedding Menu',
  'Users'
]

@Component({
  selector: 'bowling-league-dialog',
  template: `
    <div md-dialog-content>
      Your league has been updated.
    </div>
    <div md-dialog-actions align="center">
      <button md-raised-button md-ripple (click)="dialogRef.close()" id="dialogButton">Ok</button>
    </div>
`
})

export class BowlingLeagueDialogComponent{

  constructor(public dialogRef: MdDialogRef<BowlingLeagueDialogComponent>) {}
}
