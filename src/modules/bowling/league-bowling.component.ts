import {Component} from "@angular/core";
import {MdDialog} from "@angular/material";
import {BowlingLeaguesService} from "../../services/bowling/bowling-leagues.service";
import {BowlingLeague} from "../../domain/bowling-league.domain";
@Component({
  selector: 'league-bowling-component',
  templateUrl: './league-bowling.component.html'
})

export class LeagueBowlingComponent {

  loadingBowlingLeagueData : boolean = false;
  leagues : BowlingLeague[];
  selectedDay = '';
  selectedLeague : BowlingLeague;
  leaguesOnSelectedDay : BowlingLeague[] = new Array();

  constructor(public dialog: MdDialog, private bowlingLeaguesService : BowlingLeaguesService) {}

  ngOnInit() {
    this.loadingBowlingLeagueData = true;
    this.bowlingLeaguesService.getLeagues()
      .retry(2)
      .finally(() => this.loadingBowlingLeagueData = false)
      .subscribe(bowlingLeagues =>{
        this.leagues = bowlingLeagues;
      })
  }

  selectDay(day : string) {
    this.selectedLeague=null;
    this.selectedDay = day;
    this.leaguesOnSelectedDay =
      this.leagues.filter(league => league.day === day)
        .map(league => {
          return league;
        });
  }

  selectLeague(league : BowlingLeague) {
    this.selectedLeague = league;
  }

}


