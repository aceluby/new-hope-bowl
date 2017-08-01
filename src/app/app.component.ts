import {Component, NgZone} from "@angular/core";
import {MdDialog, MdDialogRef} from "@angular/material";
import { AuthService, AppGlobals } from 'angular2-google-login';
import {AdminService} from '../services/admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent  {

  selectedPage = 'Home';
  admin : boolean = false;
  dialogRef: MdDialogRef<any>;

  constructor(public dialog: MdDialog, private googleAuth: AuthService, private userService: AdminService, private zone: NgZone) {}

  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '512952439397-onaipuu36vpvaea11v974ud9885vn4up.apps.googleusercontent.com';
    this.checkUsernamePassword();
    setTimeout(() => { this.login() }, 50);
  }

  selectMenu(menuItem: string): void {
    this.selectedPage = menuItem;
  }

  login() {
    this.googleAuth.authenticateUser(()=>{
      this.zone.run(() => {
        this.checkUsernamePassword();
      });
    });
  }

  private checkUsernamePassword() {
      this.userService.getUsers()
                      .retry(2)
                      .subscribe(users => {
                        let email = localStorage.getItem('email');
                        let filteredUsers = users.filter(user => user.email === email);
                        if (filteredUsers == null || filteredUsers.length == 0) {
                          //TODO log the unauthorized attempt
                          this.admin = false;
                        } else {
                          let authenticatedUser = filteredUsers[0];
                          let roles : string[] = authenticatedUser.roles.split(',');
                          if (roles.indexOf('admin') >= 0) {
                            this.admin = true;
                          }
                        }
                      });

  }

  logout() {
    this.googleAuth.userLogout(() => {
      this.admin=false;
    });
  }

}

