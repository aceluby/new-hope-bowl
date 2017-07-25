import {Component} from "@angular/core";
@Component({
  selector: 'new-player-component',
  template: `
    <table cellspacing="0">
      <div *ngFor="let player of team">
        <tr>
          <td><md-input-container>
            <input mdInput placeholder="First Name" [(ngModel)]="player.firstName" >
          </md-input-container></td>
          <td><md-input-container>
            <input mdInput placeholder="Last Name" [(ngModel)]="player.lastName">
          </md-input-container></td>
          <td><md-input-container>
            <input mdInput placeholder="Email" [(ngModel)]="player.email">
          </md-input-container></td>
          <td><button md-button md-ripple (click)="removePlayer(team.indexOf(player))">
            <md-icon>remove</md-icon>
          </button></td>
          <td><button md-button md-ripple (click)="addNewPlayer()" *ngIf="team.indexOf(player) == team.length-1">
            <md-icon>add</md-icon>
          </button></td>
        </tr>
      </div>  
    </table>
`
})

export class NewPlayerComponent {

  team : Player[] = [
    {firstName: "", lastName: "", email: ""}
  ];

  addNewPlayer() {
    this.team.push({firstName: "", lastName: "", email: ""});
  }

  removePlayer(playerIndex : number) {
    if (this.team.length > 1) {
      this.team.splice(playerIndex, 1);
    }
  }
}

export class Player {
  firstName : string;
  lastName : string;
  email : string;
}
