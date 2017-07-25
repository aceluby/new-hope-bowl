import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballTeam, VolleyballLeague} from "../../domain/volleyball-league.domain";

@Component({
  selector: 'new-team-component',
  template: `
    <table cellspacing="0">
      <div *ngFor="let team of leagueTeams">
        <tr>
          <td><md-input-container >
              <input mdInput placeholder="Name" [value]="team.name" [(ngModel)]="team.name">
          </md-input-container></td>
          <td><md-input-container >
              <input mdInput placeholder="League" [value]="league.name" [(ngModel)]="league.name" disabled>
          </md-input-container></td>
          <td><md-input-container >
              <input mdInput placeholder="Division" [value]="team.division" [(ngModel)]="team.division" >
          </md-input-container></td>
          
          <td><button md-button md-ripple (click)="removeTeam(leagueTeams.indexOf(team))">
            <md-icon>remove</md-icon>
          </button></td>
          <td><button md-button md-ripple (click)="addNewTeam()" *ngIf="leagueTeams.indexOf(team) == leagueTeams.length-1">
            <md-icon>add</md-icon>
          </button></td>
        </tr>
      </div>  
    </table>
    <button md-raised-button md-ripple (click)="saveTeams()">Save</button>
`
})

export class NewTeamComponent {

  @Input() allTeams:VolleyballTeam[];
  @Input() leagueTeams:VolleyballTeam[];
  @Input() league:VolleyballLeague;

  constructor(private volleyballLeaguesService : VolleyballLeaguesService) {}

  addNewTeam() {
    this.leagueTeams.push(this.defaultTeam());
  }

  private defaultTeam() : VolleyballTeam {
    return {
      name: '',
      league: this.league,
      division: '',
      wins: 0,
      losses: 0,
      divisionWins: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      diff: 0
    };
  }

  removeTeam(teamIndex : number) {
    if (this.leagueTeams.length > 1) {
      this.leagueTeams.splice(teamIndex, 1);
    }
  }

  saveTeams() {
    this.leagueTeams.forEach(team => this.updateAllTeams(team));
    this.volleyballLeaguesService.saveTeams(this.allTeams);
  }

  private updateAllTeams(team : VolleyballTeam) {
    var index = this.allTeams.indexOf(team);
    if (index != -1) {
      this.allTeams.splice(index, 1);
    }
    this.allTeams.push(team)
  }

}

