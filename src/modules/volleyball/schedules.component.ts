import {Component} from "@angular/core";
import {VolleyballLeague, VolleyballTeam, VolleyballGame} from "../../domain/volleyball-league.domain";
import {MdDialog} from "@angular/material";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
@Component({
  selector: 'schedules-component',
  templateUrl: './schedules.component.html'
})

export class SchedulesComponent {
  loadingVolleyballLeagueData : boolean = false;
  selectedDay = '';
  selectedLeague : VolleyballLeague;
  leaguesOnSelectedDay : VolleyballLeague[];
  leagues : VolleyballLeague[];
  teams : VolleyballTeam[];
  redDivisionInSelectedLeague : VolleyballTeam[];
  blueDivisionInSelectedLeague : VolleyballTeam[];
  selectedTeam : VolleyballTeam;
  schedules : VolleyballGame[];
  teamSchedule : VolleyballGame[];
  leagueSchedule : VolleyballGame[];
  leagueTeams : VolleyballTeam[];
  selectedYear : string = '2017';

  constructor(public dialog: MdDialog, private volleyballLeaguesService : VolleyballLeaguesService) {}

  ngOnInit() {
    this.loadingVolleyballLeagueData = true;
    this.volleyballLeaguesService.getLeagues()
      .retry(2)
      .subscribe(volleyballLeagues =>{
        this.leagues = volleyballLeagues;
      });
    this.volleyballLeaguesService.getTeams()
      .retry(2)
      .subscribe(volleyballTeams =>{
        this.teams = volleyballTeams;
      });
    this.volleyballLeaguesService.getSchedules()
      .retry(2)
      .finally(() => this.loadingVolleyballLeagueData = false)
      .subscribe(volleyballSchedules =>{
        this.schedules = volleyballSchedules;
      });

  }

  selectYear(year : string) {
    this.selectedYear = year;
  }

  selectDay(day : string) {
    this.selectedLeague=null;
    this.selectedTeam=null;
    this.selectedDay = day;
    this.leaguesOnSelectedDay =
      this.leagues.filter(league => league.day === day)
        .map(league => {
          return league;
        });
  }

  selectLeague(league : VolleyballLeague) {
    this.selectedLeague = league;
    this.selectedTeam=null;

    this.leagueTeams = this.teams.filter(team => team.league != null)
      .filter(team => team.league.name === league.name)
      .filter(team => team.league.day === league.day);

    this.redDivisionInSelectedLeague =
      this.leagueTeams
        .filter(team => team.division === 'Red')
        .map(team => {
          return team;
        })
    ;
    this.blueDivisionInSelectedLeague =
      this.leagueTeams.filter(team => team.division === 'Blue')
        .map(team => {
          return team;
        });
    this.leagueSchedule = this.schedules.filter(game => game.teamOne.league.name == league.name && game.teamOne.league.day == league.day);
  }

  selectTeam(team : VolleyballTeam) {
    this.selectedTeam = team;
    this.teamSchedule =
      this.schedules.filter(game => game.teamOne != null)
        .filter(game => game.teamOne.name === team.name || game.teamTwo.name === team.name)
        .map(game => {
          return game;
        })
  }

  calculateResult(game : VolleyballGame, team : VolleyballTeam) : string {
    if (game.teamOne.name === team.name) {
      var wins = this.convertBooleanToNumber(game.teamOneWinGameOne) +
        this.convertBooleanToNumber(game.teamOneWinGameTwo) +
        this.convertBooleanToNumber(game.teamOneWinGameThree);
      if (wins == 0) {
        return 'L, 0-3';
      }
      else if (wins == 1) {
        return 'L, 1-2';
      }
      else if (wins == 2) {
        return 'W, 2-1';
      }
      else {
        return 'W, 3-0';
      }
    }
    else {
      var wins = this.convertBooleanToNumber(game.teamTwoWinGameOne) +
        this.convertBooleanToNumber(game.teamTwoWinGameTwo) +
          this.convertBooleanToNumber(game.teamTwoWinGameThree);
      if (wins == 0) {
        return 'L, 0-3';
      }
      else if (wins == 1) {
        return 'L, 1-2';
      }
      else if (wins == 2) {
        return 'W, 2-1';
      }
      else {
        return 'W, 3-0';
      }
    }
  }

  convertBooleanToNumber(bool : boolean) : number {
    if (bool == true) {
      return 1;
    } else {
      return 0;
    }
  }
}


