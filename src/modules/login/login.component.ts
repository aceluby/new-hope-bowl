import {Component} from '@angular/core';
import {MdDialog} from '@angular/material';
import {AdminService} from '../../services/admin/admin.service';
import {AuthService, AppGlobals} from 'angular2-google-login';
import {Router} from '@angular/router';

@Component({
             selector: 'login-component',
             template: `
    <button md-icon-button id="google-login-button" (click)="login()" type="button"> <!--login-->
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="#000000" d="M10,17.25V14H3V10H10V6.75L15.25,12L10,17.25M8,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H8A2,2 0 0,1 6,20V16H8V20H17V4H8V8H6V4A2,2 0 0,1 8,2Z"/>
      </svg>
    </button>
`,
             providers: [AuthService]
           })


export class LoginComponent {


  constructor(public dialog: MdDialog, private googleAuth: AuthService, private userService: AdminService, private router: Router) {
  }

  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '512952439397-onaipuu36vpvaea11v974ud9885vn4up.apps.googleusercontent.com';
    this.userService.cacheUsers();
    setTimeout(() => {
      if (!this.userService.getAdmin()) {
        this.login();
      }
    }, 50);
  }

  login() {
    this.googleAuth.authenticateUser(()=> {
      this.userService.checkUsernamePassword();
      if (this.userService.getAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }



  logout() {
    this.googleAuth.userLogout(() => {
      localStorage.setItem('email', '');
      this.router.navigate(['/home']);
    });
  }

}

