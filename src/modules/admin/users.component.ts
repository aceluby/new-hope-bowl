import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballGame, VolleyballTeam} from "../../domain/volleyball-league.domain";
import {AdminService} from '../../services/admin/admin.service';
import {User} from '../../domain/username-password.domain';

@Component({
  selector: 'users-component',
  template: `
    <table cellspacing="0">
      <div *ngFor="let user of users">
        <tr>
          <td><md-input-container >
              <input mdInput placeholder="Username" [value]="user.name" [(ngModel)]="user.name">
          </md-input-container></td>
          <td><md-input-container >
              <input mdInput placeholder="Email" [value]="user.email" [(ngModel)]="user.email">
          </md-input-container></td>
          <td><md-input-container >
              <input mdInput placeholder="Roles" [value]="user.roles" [(ngModel)]="user.roles">
          </md-input-container></td>
          <td><button md-button md-ripple (click)="removeUser(users.indexOf(user))">
            <md-icon>remove</md-icon>
          </button></td>
          <td><button md-button md-ripple (click)="addUser()" *ngIf="users.indexOf(user) == users.length-1">
            <md-icon>add</md-icon>
          </button></td>
        </tr>
      </div>  
    </table>
    <button md-raised-button md-ripple (click)="saveUsers()">Save</button>
`
})

export class UsersComponent {

  users : User[];

  constructor(private adminService : AdminService) {}

  ngOnInit(){
    this.adminService.getUsers()
      .retry(2)
      .subscribe(result => {
        this.users = result;
      });
  }
  private defaultUser() : User {
    return {
      id: null,
      name: '',
      email: '',
      roles: 'admin'
    }
  }

  addUser() {
    this.users.push(this.defaultUser());
  }

  removeUser(userIndex : number) {
    if (this.users.length > 1) {
      this.users.splice(userIndex, 1);
    }
  }


  saveUsers() {
    this.adminService.saveUsers(this.users);
  }

}

