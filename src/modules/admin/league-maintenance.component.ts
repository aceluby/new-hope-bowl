import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballGame, VolleyballTeam, VolleyballLeague} from "../../domain/volleyball-league.domain";
import * as _ from "dateformat";

@Component({
  selector: 'league-maintenance-component',
  template: `
    <table cellspacing="0">
      <div *ngFor="let league of leagues">
        <tr>
          <td><md-select [(ngModel)]="league.name" placeholder="Name" >
              <md-option [value]=name *ngFor="let name of names">{{name}}</md-option>
          </md-select></td>
          <td><md-select [(ngModel)]="league.day" placeholder="Day" >
              <md-option [value]=day *ngFor="let day of days">{{day}}</md-option>
          </md-select></td>
          <td><button md-button md-ripple (click)="removeLeague(leagues.indexOf(league))">
            <md-icon>remove</md-icon>
          </button></td>
          <td><button md-button md-ripple (click)="addNewLeague()" *ngIf="leagues.indexOf(league) == leagues.length-1">
            <md-icon>add</md-icon>
          </button></td>
        </tr>
      </div>  
    </table>
    <button md-raised-button md-ripple (click)="saveTeams()">Save</button>
`
})



export class LeagueMaintenanceComponent {

  @Input() leagues:VolleyballLeague[];
  names : string[] = NAMES;
  days : string[] = DAYS;

  constructor(private volleyballLeaguesService : VolleyballLeaguesService) {}

  ngOnInit() {
    this.leagues = this.volleyballLeaguesService.getOrderedLeagues(this.leagues);
  }

  addNewLeague() {
    this.leagues.push(this.defaultLeague());
  }

  private defaultLeague() : VolleyballLeague {
    return {id : null, year: '2017', name : '', day : '', isPlayoffs: false};
  }

  removeLeague(leagueIndex : number) {
    if (this.leagues.length > 1) {
      this.leagues.splice(leagueIndex, 1);
    }
  }

  saveTeams() {
    this.leagues.forEach(league => this.updateLeagues(league));
    this.leagues = this.volleyballLeaguesService.getOrderedLeagues(this.leagues);
    this.volleyballLeaguesService.saveLeagues(this.leagues);
  }

  private updateLeagues(league : VolleyballLeague) {
    var index = this.leagues.indexOf(league);
    if (index != -1) {
      this.leagues.splice(index, 1);
    }
    this.leagues.push(league)
  }

}

const DAYS : string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday'
];

const NAMES : string[] = [
  'Lower Level',
  'Upper Level'
];
