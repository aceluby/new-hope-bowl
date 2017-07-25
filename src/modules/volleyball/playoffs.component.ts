import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballGame, VolleyballTeam, Playoff} from "../../domain/volleyball-league.domain";

@Component({
  selector: 'playoffs-component',
  template: `
    <div *ngIf="playoffSchedule != null">
      <md-grid-list cols="7" rowHeight="1.5:1">
        <md-grid-tile>
            <md-card style="width: 250px">
              <md-card-title align="center">5th Place</md-card-title>
            </md-card>
        </md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px">
            <md-card-title align="center">{{playoffSchedule.game9.date}}</md-card-title>
          </md-card>
        </md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px">
            <md-card-title align="center">{{playoffSchedule.game5.date}}</md-card-title>
          </md-card>
        </md-grid-tile>
        <md-grid-tile>
            <md-card style="width: 250px">
              <md-card-title align="center">{{playoffSchedule.game1.date}}</md-card-title>
            </md-card>
        </md-grid-tile>
        <md-grid-tile>
            <md-card style="width: 250px">
              <md-card-title align="center">{{playoffSchedule.game5.date}}</md-card-title>
            </md-card></md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px">
            <md-card-title align="center">{{playoffSchedule.game9.date}}</md-card-title>
          </md-card></md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px">
            <md-card-title align="center">Champion</md-card-title>
          </md-card>
        </md-grid-tile>
        <!--*************ENDHEADERS*****************-->
        <md-grid-tile rowspan="4">
          <md-card style="width: 250px" >
            <md-card-title align="center">5th Place</md-card-title>
            <md-card-subtitle align="center">{{getGameWinnerName(playoffSchedule.game10)}}</md-card-subtitle>
          </md-card>
        </md-grid-tile>
        <md-grid-tile rowspan="4">
          <md-card style="width: 250px" >
              <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game10)}}</md-card-subtitle>
              <md-card-content align="center">{{displayOpponents(playoffSchedule.game10)}}</md-card-content>
           </md-card>
        </md-grid-tile>
        <md-grid-tile rowspan="2">
          <md-card style="width: 250px" >
              <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game7)}}</md-card-subtitle>
              <md-card-content align="center">{{displayOpponents(playoffSchedule.game7)}}</md-card-content>
           </md-card>
        </md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px" >
            <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game1)}}</md-card-subtitle>
            <md-card-content align="center">{{displayOpponents(playoffSchedule.game1)}}</md-card-content>
          </md-card>
        </md-grid-tile>
        <md-grid-tile rowspan="2">
          <md-card style="width: 250px" >
              <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game5)}}</md-card-subtitle>
              <md-card-content align="center">{{displayOpponents(playoffSchedule.game5)}}</md-card-content>
           </md-card>
        </md-grid-tile>
        <md-grid-tile rowspan="4">
          <md-card style="width: 250px" >
              <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game9)}}</md-card-subtitle>
              <md-card-content align="center">{{displayOpponents(playoffSchedule.game9)}}</md-card-content>
           </md-card>
        </md-grid-tile>
        <md-grid-tile rowspan="4">
          <md-card style="width: 250px" >
            <md-card-title align="center">Champions</md-card-title>
            <md-card-subtitle align="center">{{getGameWinnerName(playoffSchedule.game9)}}</md-card-subtitle>
          </md-card>
        </md-grid-tile>
        <!--*************ENDROW1*****************-->
        
        <md-grid-tile>
          <md-card style="width: 250px">
            <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game2)}}</md-card-subtitle>
            <md-card-content align="center">{{displayOpponents(playoffSchedule.game2)}}</md-card-content>
          </md-card>
        </md-grid-tile>
        
        <!--*************ENDROW2*****************-->
        
        <md-grid-tile rowspan="2">
          <md-card style="width: 250px" >
              <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game8)}}</md-card-subtitle>
              <md-card-content align="center">{{displayOpponents(playoffSchedule.game8)}}</md-card-content>
           </md-card>
        </md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px" >
            <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game3)}}</md-card-subtitle>
            <md-card-content align="center">{{displayOpponents(playoffSchedule.game3)}}</md-card-content>
          </md-card>
        </md-grid-tile>
        <md-grid-tile rowspan="2">
          <md-card style="width: 250px" >
              <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game6)}}</md-card-subtitle>
              <md-card-content align="center">{{displayOpponents(playoffSchedule.game6)}}</md-card-content>
           </md-card>
        </md-grid-tile>
        
        <!--*************ENDROW3*****************-->
        
        <md-grid-tile>
          <md-card style="width: 250px">
            <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game4)}}</md-card-subtitle>
            <md-card-content align="center">{{displayOpponents(playoffSchedule.game4)}}</md-card-content>
          </md-card>
        </md-grid-tile>
        
        <!--*************ENDROW4*****************-->
        
        <md-grid-tile>
          <md-card style="width: 250px" >
            <md-card-title align="center">7th Place</md-card-title>
            <md-card-subtitle align="center">{{getGameWinnerName(playoffSchedule.game12)}}</md-card-subtitle>
          </md-card>
        </md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px" >
              <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game12)}}</md-card-subtitle>
              <md-card-content align="center">{{displayOpponents(playoffSchedule.game12)}}</md-card-content>
           </md-card>
        </md-grid-tile>
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
        <md-grid-tile></md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px" >
              <md-card-subtitle align="center">{{displayTimeAndCourt(playoffSchedule.game11)}}</md-card-subtitle>
              <md-card-content align="center">{{displayOpponents(playoffSchedule.game11)}}</md-card-content>
           </md-card>
        </md-grid-tile>
        <md-grid-tile>
          <md-card style="width: 250px" >
            <md-card-title align="center">3rd Place</md-card-title>
            <md-card-subtitle align="center">{{getGameWinnerName(playoffSchedule.game11)}}</md-card-subtitle>
          </md-card>
        </md-grid-tile>

      </md-grid-list>
    </div>
`
})

export class PlayoffsComponent {

  @Input() leagueTeams: VolleyballTeam[];
  @Input() leagueSchedule: VolleyballGame[];

  allPlayoffSchedules: Playoff[];
  playoffSchedule: Playoff;
  playoffSeeds: VolleyballTeam[];

  firstGameDate: string;
  secondGameDate: string;
  thirdGameDate: string;

  constructor(private volleyballLeaguesService: VolleyballLeaguesService) {
  }

  ngOnInit() {
    if (!this.leagueTeams[0].league.isPlayoffs) {
      this.calculatePlayoffSeeds();
      this.calculateInitialPlayoffSchedule();
    } else {
      this.volleyballLeaguesService.getPlayoffs()
        .retry(2)
        .subscribe(playoffs => {
          this.allPlayoffSchedules = playoffs;
          this.allPlayoffSchedules
            .filter(playoff => playoff.game1.teamOne.league.name == this.leagueTeams[0].league.name
            && playoff.game1.teamOne.league.day == this.leagueTeams[0].league.day)
            .forEach(playoff => this.playoffSchedule = playoff);
        });
    }
  }

  getPlayoffSchedule() : Playoff {
    return this.playoffSchedule;
  }

  getAllPlayoffs() : Playoff[] {
    return this.allPlayoffSchedules;
  }

  calculatePlayoffSeeds() {
    this.playoffSeeds = this.leagueTeams.sort((a: VolleyballTeam, b: VolleyballTeam) => {
      return this.calculateBetterTeam(a, b);
    })
  }

  private calculateBetterTeam(a: VolleyballTeam, b: VolleyballTeam): number {
    if (a.wins > b.wins) {
      return 1;
    } else if (a.wins < b.wins) {
      return -1;
    } else if (a.divisionWins > b.divisionWins) {
      return 1;
    } else if (a.divisionWins < b.divisionWins) {
      return -1;
    } else if (a.pointsFor > b.pointsFor) {
      return 1;
    } else if (a.pointsFor < b.pointsFor) {
      return -1;
    } else {
      return 1;
    }
  }

  calculateInitialPlayoffSchedule() {
    let lastGameDate = new Date('1/1/2000');
    this.leagueSchedule.forEach(game => {
      let gameDate = new Date(game.date);
      if (gameDate > lastGameDate) {
        lastGameDate = gameDate;
      }
    });

    let nextGame = new Date();
    nextGame.setDate(lastGameDate.getDate() + 7);
    this.firstGameDate = this.formatDate(nextGame);
    nextGame.setDate(nextGame.getDate() + 7);
    this.secondGameDate = this.formatDate(nextGame);
    nextGame.setDate(nextGame.getDate() + 7);
    this.thirdGameDate = this.formatDate(nextGame);

    this.playoffSchedule = new Playoff();
    if (this.playoffSeeds.length == 8 && this.playoffSeeds[0].league.name == 'Lower Level') {
      this.generateLowerDivision8Teams();
    } else if (this.playoffSeeds.length == 8 && this.playoffSeeds[0].league.name == 'Upper Level') {
      this.generateUpperDivision8Teams();
    } else if (this.playoffSeeds.length == 6 && this.playoffSeeds[0].league.name == 'Lower Level') {
      this.generateLowerDivision6Teams();
    } else if (this.playoffSeeds.length == 6 && this.playoffSeeds[0].league.name == 'Upper Level') {
      this.generateUpperDivision6Teams();
    }

  }

  private generateLowerDivision8Teams() {
    this.playoffSchedule.game1 = this.generateNewGame(this.playoffSeeds[0], this.playoffSeeds[7], this.firstGameDate, "7:10", 1);
    this.playoffSchedule.game2 = this.generateNewGame(this.playoffSeeds[3], this.playoffSeeds[4], this.firstGameDate, "9:00", 1);
    this.playoffSchedule.game3 = this.generateNewGame(this.playoffSeeds[1], this.playoffSeeds[6], this.firstGameDate, "6:15", 2);
    this.playoffSchedule.game4 = this.generateNewGame(this.playoffSeeds[2], this.playoffSeeds[5], this.firstGameDate, "8:05", 2);


    this.playoffSchedule.game5 = this.generateNewGame(null, null, this.secondGameDate, "7:10", 1);
    this.playoffSchedule.game6 = this.generateNewGame(null, null, this.secondGameDate, "6:15", 2);
    this.playoffSchedule.game7 = this.generateNewGame(null, null, this.secondGameDate, "8:05", 2);
    this.playoffSchedule.game8 = this.generateNewGame(null, null, this.secondGameDate, "9:00", 1);

    this.playoffSchedule.game9 = this.generateNewGame(null, null, this.thirdGameDate, "7:10", 1);
    this.playoffSchedule.game10 = this.generateNewGame(null, null, this.thirdGameDate, "6:15", 2);
    this.playoffSchedule.game11 = this.generateNewGame(null, null, this.thirdGameDate, "8:05", 2);
    this.playoffSchedule.game12 = this.generateNewGame(null, null, this.thirdGameDate, "9:00", 1);
  }

  private generateUpperDivision8Teams() {
    this.playoffSchedule.game1 = this.generateNewGame(this.playoffSeeds[0], this.playoffSeeds[7], this.firstGameDate, "7:10", 2);
    this.playoffSchedule.game2 = this.generateNewGame(this.playoffSeeds[3], this.playoffSeeds[4], this.firstGameDate, "9:00", 2);
    this.playoffSchedule.game3 = this.generateNewGame(this.playoffSeeds[1], this.playoffSeeds[6], this.firstGameDate, "6:15", 1);
    this.playoffSchedule.game4 = this.generateNewGame(this.playoffSeeds[2], this.playoffSeeds[5], this.firstGameDate, "8:05", 1);

    this.playoffSchedule.game5 = this.generateNewGame(null, null, this.secondGameDate, "7:10", 1);
    this.playoffSchedule.game6 = this.generateNewGame(null, null, this.secondGameDate, "6:15", 2);
    this.playoffSchedule.game7 = this.generateNewGame(null, null, this.secondGameDate, "8:05", 2);
    this.playoffSchedule.game8 = this.generateNewGame(null, null, this.secondGameDate, "9:00", 1);

    this.playoffSchedule.game9 = this.generateNewGame(null, null, this.thirdGameDate, "7:10", 1);
    this.playoffSchedule.game10 = this.generateNewGame(null, null, this.thirdGameDate, "6:15", 2);
    this.playoffSchedule.game11 = this.generateNewGame(null, null, this.thirdGameDate, "8:05", 2);
    this.playoffSchedule.game12 = this.generateNewGame(null, null, this.thirdGameDate, "9:00", 1);
  }

  private generateLowerDivision6Teams() {
    this.playoffSchedule.game1 = this.generateNewGame(this.playoffSeeds[0], null, this.firstGameDate, null, 1);
    this.playoffSchedule.game2 = this.generateNewGame(this.playoffSeeds[3], this.playoffSeeds[4], this.firstGameDate, "7:10", 1);
    this.playoffSchedule.game3 = this.generateNewGame(this.playoffSeeds[1], null, this.firstGameDate, null, 2);
    this.playoffSchedule.game4 = this.generateNewGame(this.playoffSeeds[2], this.playoffSeeds[5], this.firstGameDate, "6:15", 2);


    this.playoffSchedule.game5 = this.generateNewGame(null, null, this.secondGameDate, "7:10", 1);
    this.playoffSchedule.game6 = this.generateNewGame(null, null, this.secondGameDate, "6:15", 2);
    this.playoffSchedule.game7 = this.generateNewGame(null, null, this.secondGameDate, "8:05", 2);
    this.playoffSchedule.game8 = this.generateNewGame(null, null, this.secondGameDate, "9:00", 1);

    this.playoffSchedule.game9 = this.generateNewGame(null, null, this.thirdGameDate, "7:10", 1);
    this.playoffSchedule.game10 = this.generateNewGame(null, null, this.thirdGameDate, "6:15", 2);
    this.playoffSchedule.game11 = this.generateNewGame(null, null, this.thirdGameDate, "8:05", 2);
    this.playoffSchedule.game12 = this.generateNewGame(null, null, this.thirdGameDate, "9:00", 1);
  }

  private generateUpperDivision6Teams() {
    this.playoffSchedule.game1 = this.generateNewGame(this.playoffSeeds[0], null, this.firstGameDate, null, 1);
    this.playoffSchedule.game2 = this.generateNewGame(this.playoffSeeds[3], this.playoffSeeds[4], this.firstGameDate, "7:10", 2);
    this.playoffSchedule.game3 = this.generateNewGame(this.playoffSeeds[1], null, this.firstGameDate, null, 2);
    this.playoffSchedule.game4 = this.generateNewGame(this.playoffSeeds[2], this.playoffSeeds[5], this.firstGameDate, "6:15", 1);


    this.playoffSchedule.game5 = this.generateNewGame(null, null, this.secondGameDate, "7:10", 2);
    this.playoffSchedule.game6 = this.generateNewGame(null, null, this.secondGameDate, "6:15", 1);
    this.playoffSchedule.game7 = this.generateNewGame(null, null, this.secondGameDate, "8:05", 1);
    this.playoffSchedule.game8 = this.generateNewGame(null, null, this.secondGameDate, "9:00", 2);

    this.playoffSchedule.game9 = this.generateNewGame(null, null, this.thirdGameDate, "7:10", 2);
    this.playoffSchedule.game10 = this.generateNewGame(null, null, this.thirdGameDate, "6:15", 1);
    this.playoffSchedule.game11 = this.generateNewGame(null, null, this.thirdGameDate, "8:05", 1);
    this.playoffSchedule.game12 = this.generateNewGame(null, null, this.thirdGameDate, "9:00", 2);

  }

  private generateNewGame(team1: VolleyballTeam, team2: VolleyballTeam, date: string, time: string, court: number): VolleyballGame {
    let game = {
      id: null,
      teamOne: team1,
      teamOneHome: true,
      teamOneScoreGameOne: null,
      teamOneScoreGameTwo: null,
      teamOneScoreGameThree: null,
      teamOneWinGameOne: null,
      teamOneWinGameTwo: null,
      teamOneWinGameThree: null,
      teamTwo: team2,
      teamTwoScoreGameOne: null,
      teamTwoScoreGameTwo: null,
      teamTwoScoreGameThree: null,
      teamTwoWinGameOne: null,
      teamTwoWinGameTwo: null,
      teamTwoWinGameThree: null,
      divisionalGame: null,
      date: date,
      time: time,
      court: court
    };
    return game
  }

  private formatDate(inputDate: any): string {
    var dateFormat = require('dateformat');
    var date = Date.parse(inputDate);
    return dateFormat(date, "mm-dd-yyyy");
  }

  getGameWinnerName(game: VolleyballGame): string {
    if (game.teamOneScoreGameOne == null) {
      return "";
    }
    if (game.teamOneWinGameOne) {
      if (game.teamOneWinGameTwo || game.teamOneWinGameThree) {
        return game.teamOne.name;
      }
      else {
        return game.teamTwo.name;
      }
    } else if (game.teamTwoWinGameTwo || game.teamTwoWinGameThree) {
      return game.teamTwo.name;
    } else {
      return game.teamOne.name;
    }
  }

  displayTimeAndCourt(game : VolleyballGame) : string {
    if (game.time != null) {
      return game.time.toString() + " - Court " + game.court.toString();
    } else {
      return "";
    }
  }

  displayOpponents(game : VolleyballGame) : string {
    if (game.teamOne == null) {
      return "";
    } else if (game.teamTwo == null) {
      return game.teamOne.name + " BYE";
    } else {
      return game.teamOne.name + " vs " + game.teamTwo.name;
    }
  }

}

