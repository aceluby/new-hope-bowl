/**
 * Created by z013hmy on 6/30/17.
 */

import {Component} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballLeague, VolleyballTeam, VolleyballGame, Playoff} from "../../domain/volleyball-league.domain";
import {MdDialogRef, MdDialog} from "@angular/material";
import {SchedulesComponent} from "../volleyball/schedules.component";
import {PlayoffsComponent} from "../volleyball/playoffs.component";
@Component({
  selector: 'volleyball-admin-component',
  templateUrl: './volleyball-admin.component.html'
})



export class VolleyballAdminComponent{

  functions = FUNCTIONS;
  leagueMaintenance = LEAGUE_MAINTENANCE;
  selectedMenu = '';
  volleyballLeagues : VolleyballLeague[];
  volleyballTeams : VolleyballTeam[];
  leagueTeams : VolleyballTeam[];
  schedules : VolleyballGame[];
  leagueSchedule : VolleyballGame[];
  selectedLeague : VolleyballLeague;
  selectedDay = '';
  leaguesOnSelectedDay : VolleyballLeague[];
  gamesOnDate : VolleyballGame[];
  selectedMaintenance = '';
  startDate = '';

  constructor(private volleyballLeaguesService : VolleyballLeaguesService, public dialog: MdDialog) {}

  ngOnInit() {
    this.refreshLeagues();
    this.refreshTeams();
    this.refreshSchedules();
    this.selectedMenu='';
  }

  refreshSchedules() {
    this.volleyballLeaguesService.getSchedules()
      .retry(2)
      .subscribe(schedules =>{
        this.schedules = schedules;
      })
  }

  refreshTeams() {
    this.volleyballLeaguesService.getTeams()
      .retry(2)
      .subscribe(volleyballTeams =>{
        this.volleyballTeams = volleyballTeams;
      })
  }

  refreshLeagues() {
    this.volleyballLeaguesService.getLeagues()
      .retry(2)
      .subscribe(volleyballLeagues =>{
        this.volleyballLeagues = volleyballLeagues;
      })
  }

  selectMenu(menuItem : string) {
    this.resetMenuVariables();
    this.selectedMenu = menuItem;
  }

  private resetMenuVariables() {
    this.resetDayVariables()
    this.selectedDay = '';
    this.selectedMaintenance = '';
  }

  private resetDayVariables() {
    this.resetLeagueVariables();
    this.gamesOnDate = null;
  }

  private resetLeagueVariables() {
    this.selectedLeague=null;
  }

  selectDay(day : string) {
    this.resetDayVariables()
    this.setDayVariables(day);
  }

  private setDayVariables(day: string) {
    this.selectedDay = day;
    this.leaguesOnSelectedDay =
      this.volleyballLeagues.filter(league => league.day === day)
        .map(league => {
          return league;
        });
  }

  selectLeague(league : VolleyballLeague) {
    this.resetLeagueVariables();
    this.setLeagueVariables(league);
  }

  private setLeagueVariables(league : VolleyballLeague) {
    this.selectedLeague = league;
    this.leagueSchedule = this.getLeagueSchedule(league);
    this.leagueTeams = this.getLeagueTeams(league);
  }

  private getLeagueSchedule(league : VolleyballLeague) : VolleyballGame[] {
    console.log(this.schedules);
    console.log(this.schedules.filter(game => game.teamOne == null));
    return this.schedules
      .filter(game => game.teamOne.league.name === league.name &&
      game.teamOne.league.day === league.day)
      .filter(game => game.date != null && game.date != '')
      .map(game => {
        return game;
      });
  }

  private getLeagueTeams(league : VolleyballLeague) : VolleyballTeam[] {
    return this.volleyballTeams
      .filter(team => team.league.name == league.name &&
      team.league.day == league.day);
  }

  selectDate(date : string) {
    this.gamesOnDate = this.getGamesOnDate(date);
  }

  private getGamesOnDate(date : string) {
    return this.leagueSchedule
      .filter(game => game.date===date)
      .map(game => {
        return game;
      });
  }

  saveScores() {
    this.gamesOnDate.forEach(game => {
      var calculatedGame = this.calculateGameWinners(game);
      this.updateSchedules(calculatedGame);
      this.updateVolleyballTeams(this.getTeam(calculatedGame.teamOne));
      this.updateVolleyballTeams(this.getTeam(calculatedGame.teamTwo));

    });
    this.volleyballLeaguesService.saveSchedules(this.schedules);
    this.volleyballLeaguesService.saveTeams(this.volleyballTeams);
  }

  private updateSchedules(updatedGame : VolleyballGame) {
    this.schedules = this.schedules.map(game => {
      if (this.gamesMatch(game, updatedGame)) {
        return updatedGame;
      } else {
        return game;
      }
    })
  }

  private gamesMatch(game1 : VolleyballGame, game2 : VolleyballGame) : boolean {
    if (game1.date != game2.date) {
      return false;
    }
    if (game1.time != game2.time) {
      return false;
    }
    if (game1.court != game2.court) {
      return false;
    }
    if (game1.teamOne.name != game2.teamOne.name) {
      return false;
    }
    if (game1.teamTwo.name != game2.teamTwo.name) {
      return false;
    }
    return true;
  }

  private getTeam(selectedTeam : VolleyballTeam) : VolleyballTeam {
    return this.volleyballTeams.filter(team => selectedTeam.name === team.name)[0];
  }

  private updateVolleyballTeams(team : VolleyballTeam) {
    var wins : number = 0;
    var losses : number = 0;
    var pointsFor : number = 0;
    var pointsAgainst : number = 0;
    var divisionWins : number = 0;
    this.schedules.filter(game => game.teamOne.name === team.name)
      .forEach(game => {
        pointsFor = pointsFor + this.calculateTeamOnePoints(game);
        pointsAgainst = pointsAgainst + this.calculateTeamTwoPoints(game);
        wins = wins + this.calculateTeamOneWins(game);
        losses = losses + this.calculateTeamTwoWins(game);
        divisionWins = divisionWins + this.calculateTeamOneDivisionWins(game);
      })
    this.schedules.filter(game => game.teamTwo.name === team.name)
      .forEach(game => {
        pointsAgainst = pointsAgainst + this.calculateTeamOnePoints(game);
        pointsFor = pointsFor + this.calculateTeamTwoPoints(game);
        wins = wins + this.calculateTeamTwoWins(game);
        losses = losses + this.calculateTeamOneWins(game);
        divisionWins = divisionWins + this.calculateTeamTwoDivisionWins(game);
      });
    this.updateTeamData(team, wins, losses, divisionWins, pointsFor, pointsAgainst);
  }

  private updateTeamData(team: VolleyballTeam, wins: number, losses: number, divisionWins: number, pointsFor: number, pointsAgainst: number) {
    team.wins = wins;
    team.losses = losses;
    team.divisionWins = divisionWins;
    team.pointsFor = pointsFor;
    team.pointsAgainst = pointsAgainst;
    team.diff = pointsFor - pointsAgainst;
  }

  private calculateTeamTwoWins(game : VolleyballGame) : number {
    return this.convertBoolLossToNumber(game.teamOneWinGameOne) +
      this.convertBoolLossToNumber(game.teamOneWinGameTwo) + this.convertBoolLossToNumber(game.teamOneWinGameThree);
  }

  private calculateTeamOneWins(game : VolleyballGame) : number  {
    return this.convertBoolWinToNumber(game.teamOneWinGameOne) +
      this.convertBoolWinToNumber(game.teamOneWinGameTwo) +
      this.convertBoolWinToNumber(game.teamOneWinGameThree);
  }

  private calculateTeamOneDivisionWins(game : VolleyballGame) : number  {
    if (game.divisionalGame) {
      return this.calculateTeamOneWins(game);
    } else {
      return 0;
    }
  }

  private calculateTeamTwoDivisionWins(game : VolleyballGame) : number  {
    if (game.divisionalGame) {
      return this.calculateTeamTwoWins(game);
    } else {
      return 0;
    }
  }

  private calculateTeamTwoPoints(game : VolleyballGame) : number  {
    return this.nullNum(game.teamTwoScoreGameOne) +
      this.nullNum(game.teamTwoScoreGameTwo) +
      this.nullNum(game.teamTwoScoreGameThree);
  }

  private calculateTeamOnePoints(game : VolleyballGame) : number  {
    return this.nullNum(game.teamOneScoreGameOne) +
      this.nullNum(game.teamOneScoreGameTwo) +
      this.nullNum(game.teamOneScoreGameThree);
  }

  private nullNum(num : number) : number {
    if (num == null) {
      return 0;
    } else {
      return Number(num);
    }
  }

  private convertBoolWinToNumber(bool : boolean) : number {
    if (bool == null) {
      return 0;
    }
    else if (bool === true) {
      return 1;
    } else {
      return 0;
    }
  }

  private convertBoolLossToNumber(bool : boolean) : number {
    if (bool == null) {
      return 0;
    }
    else if (bool === false) {
      return 1;
    } else {
      return 0;
    }
  }

  private calculateGameWinners(game : VolleyballGame) : VolleyballGame {
    var calculatedGame = game;
    if (game.teamOneScoreGameOne > game.teamTwoScoreGameOne) {
      calculatedGame.teamOneWinGameOne = true;
      calculatedGame.teamTwoWinGameOne = false;
    } else {
      calculatedGame.teamOneWinGameOne = false;
      calculatedGame.teamTwoWinGameOne = true;
    }
    if (game.teamOneScoreGameTwo > game.teamTwoScoreGameTwo) {
      calculatedGame.teamOneWinGameTwo = true;
      calculatedGame.teamTwoWinGameTwo = false;
    } else {
      calculatedGame.teamOneWinGameTwo = false;
      calculatedGame.teamTwoWinGameTwo = true;
    }
    if (game.teamOneScoreGameThree > game.teamTwoScoreGameThree) {
      calculatedGame.teamOneWinGameThree = true;
      calculatedGame.teamTwoWinGameThree = false;
    } else {
      calculatedGame.teamOneWinGameThree = false;
      calculatedGame.teamTwoWinGameThree = true;
    }
    calculatedGame.teamOneScoreGameOne = Number(game.teamOneScoreGameOne)
    calculatedGame.teamOneScoreGameTwo = Number(game.teamOneScoreGameTwo)
    calculatedGame.teamOneScoreGameThree = Number(game.teamOneScoreGameThree)
    calculatedGame.teamTwoScoreGameOne = Number(game.teamTwoScoreGameOne)
    calculatedGame.teamTwoScoreGameTwo = Number(game.teamTwoScoreGameTwo)
    calculatedGame.teamTwoScoreGameThree = Number(game.teamTwoScoreGameThree)
    return calculatedGame;
  }

  selectMaintenance(maintenance : string) {
    this.selectedMaintenance = maintenance;
    if (maintenance === 'Reset Schedules') {
      this.openDialog();
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(ResetDialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Ok') {
        this.resetSchedules();
      }
    });
  }

  private resetSchedules() {
    let sundayTeams : VolleyballTeam[] = new Array();
    let mondayTeams : VolleyballTeam[] = new Array();
    let tuesdayTeams : VolleyballTeam[] = new Array();
    let wednesdayTeams : VolleyballTeam[] = new Array();
    let thursdayTeams : VolleyballTeam[] = new Array();
    this.volleyballTeams.forEach(team => {
      switch (team.league.day) {
        case 'Sunday': {
          sundayTeams.push(team);
        }
        case 'Monday': {
          mondayTeams.push(team);
        }
        case 'Tuesday': {
          tuesdayTeams.push(team);
        }
        case 'Wednesday': {
          wednesdayTeams.push(team);
        }
        case 'Thursday': {
          thursdayTeams.push(team);
        }
      }
    });
    this.schedules=new Array();
    this.startDate = '5/1/2017';
    this.generateSchedule(sundayTeams).forEach(game => this.schedules.push(game));

    this.volleyballLeaguesService.saveSchedules(this.schedules)

  }


  private generateSchedule(teams : VolleyballTeam[]): VolleyballGame[] {
    if (teams.length == 14) {
      return this.generateFourteenTeamSchedule(teams);
    } else {
      return this.generateSixteenTeamSchedule(teams);
    }
  }

  private generateFourteenTeamSchedule(teams: VolleyballTeam[]) : VolleyballGame[] {
    let returnSchedule : VolleyballGame[] = new Array();
    let lowerTeams : VolleyballTeam[] = new Array();
    let upperTeams : VolleyballTeam[] = new Array();
    let day : string = this.calculateStartDay(this.startDate, teams[0].league.day)

    teams.forEach(team => {
      if (team.league.name == 'Lower Level') {
        lowerTeams.push(team);
      } else {
        upperTeams.push(team);
      }
    });

    console.log(upperTeams);

    let lowerDivisionBlue = lowerTeams.filter(team => team.division == 'Blue');
    let lowerDivisionRed = lowerTeams.filter(team => team.division == 'Red');
    for (let week = 0; week < 12; week++) {
      console.log(week);
      let d = new Date(day);
      d.setDate(d.getDate() + (7));
      day = this.formatDate(d);
      console.log(day);

      switch (week) {
        case 0:
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionBlue[1], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionBlue[3], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionRed[1], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionRed[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[0], upperTeams[1], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[2], upperTeams[3], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[4], upperTeams[5], day, '9:00', 1));
          break;
        case 1:
          returnSchedule.push(this.generateNewGame(upperTeams[5], upperTeams[3], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[1], upperTeams[4], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[0], upperTeams[2], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionBlue[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionBlue[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionRed[0], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionRed[2], day, '9:00', 2));
          break;
        case 2:
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionRed[2], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionRed[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionBlue[2], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionBlue[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[5], upperTeams[1], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[2], upperTeams[4], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[0], upperTeams[3], day, '9:00', 1));
          break;
        case 3:
          returnSchedule.push(this.generateNewGame(upperTeams[4], upperTeams[0], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[3], upperTeams[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[5], upperTeams[2], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionBlue[1], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionBlue[2], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionBlue[0], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionBlue[3], day, '9:00', 1));
          break;
        case 4:
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionBlue[2], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionBlue[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionBlue[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionBlue[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[2], upperTeams[1], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[0], upperTeams[5], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[3], upperTeams[4], day, '9:00', 1));
          break;
        case 5:
          returnSchedule.push(this.generateNewGame(upperTeams[1], upperTeams[5], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[4], upperTeams[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[3], upperTeams[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionBlue[3], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionRed[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionBlue[2], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionBlue[1], day, '9:00', 2));
          break;
        case 6:
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionBlue[0], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionBlue[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionRed[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionRed[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[1], upperTeams[0], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[3], upperTeams[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[5], upperTeams[4], day, '9:00', 1));
          break;
        case 7:
          returnSchedule.push(this.generateNewGame(upperTeams[3], upperTeams[5], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[4], upperTeams[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[2], upperTeams[0], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionBlue[3], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionBlue[1], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionRed[3], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionRed[1], day, '9:00', 2));
          break;
        case 8:
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionRed[0], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionRed[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionBlue[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionBlue[1], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[1], upperTeams[5], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[4], upperTeams[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[3], upperTeams[0], day, '9:00', 1));
          break;
        case 9:
          returnSchedule.push(this.generateNewGame(upperTeams[0], upperTeams[4], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[1], upperTeams[3], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[2], upperTeams[5], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionRed[1], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionRed[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionRed[0], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionRed[3], day, '9:00', 2));
          break;
        case 10:
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionRed[3], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionRed[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionBlue[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionRed[0], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[1], upperTeams[2], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[5], upperTeams[0], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[4], upperTeams[3], day, '9:00', 1));
          break;
        case 11:
          returnSchedule.push(this.generateNewGame(upperTeams[5], upperTeams[1], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[2], upperTeams[4], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[0], upperTeams[3], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionRed[1], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionRed[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionRed[0], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionRed[3], day, '9:00', 2));
          break;
      }
    }

    return returnSchedule;
  }

  private generateSixteenTeamSchedule(teams: VolleyballTeam[]) : VolleyballGame[] {
    let returnSchedule : VolleyballGame[] = new Array();
    let lowerTeams : VolleyballTeam[] = new Array();
    let upperTeams : VolleyballTeam[] = new Array();
    let day : string = this.calculateStartDay(this.startDate, teams[0].league.day)
    teams.forEach(team => {
      if (team.league.name == 'Lower Level') {
        lowerTeams.push(team);
      } else {
        upperTeams.push(team);
      }
    });
    for (let week = 0; week < 12; week++) {
      let d = new Date(day);
      d.setDate(d.getDate() + (7));
      day = this.formatDate(d);
      let lowerDivisionBlue = lowerTeams.filter(team => team.division == 'Blue');
      let lowerDivisionRed = lowerTeams.filter(team => team.division == 'Red');
      let upperDivisionBlue = upperTeams.filter(team => team.division == 'Blue');
      let upperDivisionRed = upperTeams.filter(team => team.division == 'Red');
      switch (week) {
        case 0:
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionBlue[1], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionBlue[3], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionRed[1], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionRed[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[0], upperDivisionBlue[1], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[2], upperDivisionBlue[3], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[0], upperDivisionRed[1], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[2], upperDivisionRed[3], day, '9:00', 2));
          break;
        case 1:
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[3], upperDivisionBlue[0], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[1], upperDivisionBlue[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[3], upperDivisionRed[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[1], upperDivisionRed[2], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionBlue[0], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionBlue[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionRed[0], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionRed[2], day, '9:00', 2));
          break;
        case 2:
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionRed[2], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionRed[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionBlue[2], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionBlue[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[0], upperDivisionRed[2], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[3], upperDivisionRed[1], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[0], upperDivisionBlue[2], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[1], upperDivisionBlue[3], day, '9:00', 2));
          break;
        case 3:
          returnSchedule.push(this.generateNewGame(upperTeams[4], upperTeams[0], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperTeams[3], upperTeams[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperTeams[5], upperTeams[2], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[1], upperDivisionBlue[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[2], upperDivisionBlue[2], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[0], upperDivisionBlue[0], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[3], upperDivisionBlue[3], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionBlue[1], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionBlue[2], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionBlue[0], day, '9:00', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionBlue[3], day, '9:00', 1));
          break;
        case 4:
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionBlue[2], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionBlue[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionBlue[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionBlue[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[3], upperDivisionBlue[2], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[2], upperDivisionBlue[1], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[1], upperDivisionBlue[0], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[0], upperDivisionBlue[3], day, '9:00', 2));
          break;
        case 5:
          returnSchedule.push(this.generateNewGame(upperDivisionRed[1], upperDivisionBlue[3], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[0], upperDivisionRed[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[0], upperDivisionBlue[2], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[3], upperDivisionBlue[1], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionBlue[3], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionRed[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionBlue[2], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionBlue[1], day, '9:00', 2));
          break;
        case 6:
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionBlue[0], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionBlue[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionRed[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionRed[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[1], upperDivisionBlue[0], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[3], upperDivisionBlue[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[1], upperDivisionRed[0], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[2], upperDivisionRed[3], day, '9:00', 2));
          break;
        case 7:
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[0], upperDivisionBlue[3], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[2], upperDivisionBlue[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[0], upperDivisionRed[3], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[2], upperDivisionRed[1], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionBlue[3], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionBlue[1], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[0], lowerDivisionRed[3], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionRed[1], day, '9:00', 2));
          break;
        case 8:
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[2], lowerDivisionRed[0], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[3], lowerDivisionRed[1], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionBlue[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionBlue[1], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[2], upperDivisionRed[0], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[3], upperDivisionRed[1], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[2], upperDivisionBlue[0], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[3], upperDivisionBlue[1], day, '9:00', 2));
          break;
        case 9:
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[1], upperDivisionRed[1], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[2], upperDivisionRed[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[0], upperDivisionRed[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[3], upperDivisionRed[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionRed[1], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionRed[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionRed[0], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionRed[3], day, '9:00', 2));
          break;
        case 10:
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionRed[3], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionRed[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionRed[1], lowerDivisionBlue[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionRed[0], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[2], upperDivisionRed[3], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[1], upperDivisionRed[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionRed[1], upperDivisionBlue[0], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[3], upperDivisionRed[0], day, '9:00', 2));
          break;
        case 11:
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[3], upperDivisionRed[1], day, '6:15', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[0], upperDivisionRed[2], day, '6:15', 2));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[2], upperDivisionRed[0], day, '7:10', 1));
          returnSchedule.push(this.generateNewGame(upperDivisionBlue[1], upperDivisionRed[3], day, '7:10', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[3], lowerDivisionRed[1], day, '8:05', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[0], lowerDivisionRed[2], day, '8:05', 2));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[2], lowerDivisionRed[0], day, '9:00', 1));
          returnSchedule.push(this.generateNewGame(lowerDivisionBlue[1], lowerDivisionRed[3], day, '9:00', 2));
          break;
      }
    }

    return returnSchedule;
  }

  private generateNewGame(team1 : VolleyballTeam, team2 : VolleyballTeam, date : string, time : string, court : number) : VolleyballGame {
    let game = {id: null, teamOne: team1, teamOneHome: true, teamOneScoreGameOne: null, teamOneScoreGameTwo: null, teamOneScoreGameThree: null, teamOneWinGameOne: null, teamOneWinGameTwo: null, teamOneWinGameThree: null,
      teamTwo: team2, teamTwoScoreGameOne: null, teamTwoScoreGameTwo: null, teamTwoScoreGameThree: null, teamTwoWinGameOne: null, teamTwoWinGameTwo: null, teamTwoWinGameThree: null,
      divisionalGame: null, date: date, time: time, court: court};
    console.log(game);
    return game;
  }

  private calculateStartDay(startDate: string, day: string) : string {
    let startDay = new Date(startDate);
    switch (day) {
      case 'Sunday' : {
        startDay.setDate(startDay.getDate() + (7 - startDay.getDay()));
        break;
      }
      case 'Monday' : {
        startDay.setDate(startDay.getDate() + (1 + 7 - startDay.getDay()));
        break;
      }
      case 'Tuesday' : {
        startDay.setDate(startDay.getDate() + (2 + 7 - startDay.getDay()));
        break;
      }
      case 'Wednesday' : {
        startDay.setDate(startDay.getDate() + (3 + 7 - startDay.getDay()));
        break;
      }
      case 'Thursday' : {
        startDay.setDate(startDay.getDate() + (4 + 7 - startDay.getDay()));
        break;
      }
    }
    return this.formatDate(startDay);
  }

  private formatDate(inputDate : any) : string {
    var dateFormat = require('dateformat');
    var date = Date.parse(inputDate);
    return dateFormat(date, "mm-dd-yyyy");
  }

  startPlayoffs() {
    let playoffComponent : PlayoffsComponent = new PlayoffsComponent(this.volleyballLeaguesService);
    playoffComponent.leagueTeams = this.leagueTeams;
    playoffComponent.leagueSchedule = this.leagueSchedule;
    playoffComponent.calculatePlayoffSeeds();
    playoffComponent.calculateInitialPlayoffSchedule();
    let newPlayoff = playoffComponent.getPlayoffSchedule();
    let allPlayoffs = playoffComponent.getAllPlayoffs();
    let oldPlayoff : Playoff;
    allPlayoffs.forEach(playoff => {
      if (playoff.game1.teamOne.league.name == newPlayoff.game1.teamOne.league.name &&
        playoff.game1.teamOne.league.day == newPlayoff.game1.teamOne.league.day) {
        oldPlayoff = playoff;
      }
    });
    if (oldPlayoff == null) {
      allPlayoffs.push(newPlayoff);
    } else {
      let index = allPlayoffs.indexOf(oldPlayoff);
      allPlayoffs.splice(index, 1);
      allPlayoffs.push(newPlayoff);
    }
    this.volleyballLeaguesService.savePlayoff(allPlayoffs);
  }

}

const FUNCTIONS : string[] = [
  'League Maintenance',
  'Enter Scores'
];

const LEAGUE_MAINTENANCE : string[] = [
  'Add/Remove a League',
  'Edit League',
  'Edit Schedule'
];

@Component({
  selector: 'reset-confirm-dialog',
  template: `
    <div md-dialog-title>
      Confirm Reset
     </div>
    <div md-dialog-content>
      <div>This will permanently erase</div>
      <div>all current data.</div>
      <br>
      <div>New schedules will be created.</div>
    </div>
    <div md-dialog-actions align="center">
      <button md-raised-button md-ripple md-dialog-close="Cancel" style="padding: 5px;">Cancel</button>
      <button md-raised-button md-ripple md-dialog-close="Ok"  style="padding: 5px;">Ok</button>
    </div>
`
})

export class ResetDialogConfirmComponent{

  constructor(public dialogRef: MdDialogRef<ResetDialogConfirmComponent>) {}

}







