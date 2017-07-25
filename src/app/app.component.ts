import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {MdDialog, MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedPage = 'Home';
  admin : boolean = false;
  dialogRef: MdDialogRef<any>;

  loginAdmin : string = "loginAdmin";

  constructor(public dialog: MdDialog) {}

  selectMenu(menuItem: string): void {
    this.selectedPage = menuItem;
  }

  login() {
    let tempdialogRef = this.dialog.open(LoginDialogComponent);
    tempdialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        return;
      } else {
        this.checkUsernamePassword(result);
        //TODO check username password here
      }
    });
  }

  private checkUsernamePassword(result) {
    this.admin=true;
  }

  logout() {
    this.admin=false;
  }

}

@Component({
  selector: 'login-dialog',
  template: `
    <h1 md-dialog-title>Login</h1>
    <div md-dialog-content>
      <md-input-container>
         <input mdInput placeholder="Username" [value]=usernamePassword.username required>
      </md-input-container>
      <br>
      <md-input-container>
         <input type="password" mdInput placeholder="Password" [value]=usernamePassword.password required>
      </md-input-container>
    </div>
    <div md-dialog-actions>
      <button md-button md-ripple [md-dialog-close]="null">Cancel</button>
      <button md-button md-ripple [md-dialog-close]="getUsernamePassword()">Ok</button>
    </div>
`
})

export class LoginDialogComponent{

  usernamePassword : UsernamePassword = new UsernamePassword();

  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>) {}

  getUsernamePassword() {
    return this.usernamePassword;
  }
}

export class UsernamePassword {
  username : string = '';
  password : string = '';
}

