import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballGame, VolleyballTeam} from "../../domain/volleyball-league.domain";

@Component({
  selector: 'new-game-component',
  template: `
    <table cellspacing="0">
      <div *ngFor="let game of leagueSchedule">
        <tr>
          <td><md-input-container>
              <input mdInput [mdDatepicker]="picker" placeholder="Choose a date" [value]="game.date" [(ngModel)]="game.date" >
              <button mdSuffix [mdDatepickerToggle]="picker">{{game.date}}</button>
            </md-input-container>
          <md-datepicker touchUi="true" #picker></md-datepicker></td>
          <td><md-input-container >
              <input mdInput placeholder="Time" [value]="game.time" [(ngModel)]="game.time">
          </md-input-container></td>
          <td ><md-select [(ngModel)]="game.court" placeholder="Court">
              <md-option [value]="1">1</md-option>
              <md-option [value]="2">2</md-option>
          </md-select></td>
          <td><md-select [(ngModel)]="game.teamOne.name" placeholder="Team 1">
              <md-option *ngFor="let team of leagueTeams" [value]="team.name">{{team.name}}</md-option>
          </md-select></td>
          <td><md-checkbox [checked]="game.teamOneHome" labelPosition="before">Home:</md-checkbox></td>
          <td><md-select [(ngModel)]="game.teamTwo.name" placeholder="Team 2">
            <md-option *ngFor="let team of leagueTeams" [value]="team.name">{{team.name}}</md-option>
          </md-select></td>
          <td><button md-button md-ripple (click)="removeGame(leagueSchedule.indexOf(game))">
            <md-icon>remove</md-icon>
          </button></td>
          <td><button md-button md-ripple (click)="addNewGame()" *ngIf="leagueSchedule.indexOf(game) == leagueSchedule.length-1">
            <md-icon>add</md-icon>
          </button></td>
        </tr>
      </div>  
    </table>
    <button md-raised-button md-ripple (click)="saveSchedules()">Save</button>
    <button md-raised-button md-ripple (click)="resetSchedules()">Reset</button>
`
})

export class NewGameComponent {

  @Input() leagueSchedule:VolleyballGame[];
  @Input() leagueTeams:VolleyballTeam[];
  @Input() schedules:VolleyballGame[];

  constructor(private volleyballLeaguesService : VolleyballLeaguesService) {}

  addNewGame() {
    this.leagueSchedule.push(this.defaultGame());
  }

  private defaultGame() : VolleyballGame {
    return {
      id: null,
      teamOne: new VolleyballTeam,
      teamOneHome: true,
      teamOneScoreGameOne: null,
      teamOneWinGameOne: null,
      teamOneScoreGameTwo: null,
      teamOneWinGameTwo: null,
      teamOneScoreGameThree: null,
      teamOneWinGameThree: null,
      teamTwo: new VolleyballTeam,
      teamTwoScoreGameOne: null,
      teamTwoWinGameOne: null,
      teamTwoScoreGameTwo: null,
      teamTwoWinGameTwo: null,
      teamTwoScoreGameThree: null,
      teamTwoWinGameThree: null,
      divisionalGame: null,
      date: '',
      time: '',
      court: null
    }
  }

  removeGame(gameIndex : number) {
    if (this.leagueSchedule.length > 1) {
      this.leagueSchedule.splice(gameIndex, 1);
    }
  }

  saveSchedules() {
    this.leagueSchedule.forEach(game => this.updateSchedules(this.getGameWithMasterData(game)));
    this.volleyballLeaguesService.saveSchedules(this.schedules);
  }

  private getGameWithMasterData(game : VolleyballGame) : VolleyballGame {
    game.date=this.formatDate(game.date);
    game.teamOne = this.getTeamOne(game);
    game.teamTwo = this.getTeamTwo(game);
    game.divisionalGame = this.isDivisionalGame(game);
    return game;
  }

  private getTeamOne(game : VolleyballGame) {
    return this.leagueTeams.filter(team => team.name === game.teamOne.name)[0];
  }

  private getTeamTwo(game : VolleyballGame) {
    return this.leagueTeams.filter(team => team.name === game.teamTwo.name)[0];
  }

  private isDivisionalGame(game : VolleyballGame) : boolean {
    return game.teamOne.division == game.teamTwo.division;
  }

  private updateSchedules(game : VolleyballGame) {
    var index = this.schedules.indexOf(game);
    if (index != -1) {
      this.schedules.splice(index, 1);
    }
    this.schedules.push(game);
  }

  private formatDate(inputDate : any) : string {
    var dateFormat = require('dateformat');
    var date = Date.parse(inputDate);
    return dateFormat(date, "mm-dd-yyyy");
  }

  resetSchedules() {
    this.leagueSchedule = new Array();
    this.leagueSchedule.push(this.defaultGame());
  }
}

