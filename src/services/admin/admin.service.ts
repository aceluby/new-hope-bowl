import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {User} from '../../domain/username-password.domain';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AdminService implements CanActivate {

  private admin = false;
  private cachedUsers: User[] = new Array();

  constructor(private http: Http, public snackBar: MdSnackBar, private router: Router) {
    this.cacheUsers();
  }

  public getAdmin(): boolean {
    return this.admin;
  }

  openSnackBar(message: string) {
    let snackbarConfig: MdSnackBarConfig = new MdSnackBarConfig();
    snackbarConfig.duration = 2000;
    this.snackBar.open(message, null, snackbarConfig);
  }

  getUsers(): Observable<User[]> {
    return this.http.get('/api/admin')
               .map((res: any) => res.json())
               .map(json => {
                 var user: User[] = json;
                 return user;
               })
  }

  cacheUsers() {
    this.getUsers()
        .retry(2)
        .subscribe(users => {
          this.cachedUsers = users;
          this.checkUsernamePassword();
        });
  }

  saveUsers(users: User[]): Promise<any> {
    return this.http.post('/api/admin', users)
               .map(res => res.json())
               .finally(() => this.openSnackBar("User Saved"))
               .toPromise();
  }

  canActivate() {
    if (this.admin == true) {
      return true;
    } else {
      this.router.navigate(['/home']);
    }
  }

  checkUsernamePassword() {
    let email = localStorage.getItem('email');
    let filteredUsers = this.cachedUsers.filter(user => user.email === email);
    if (filteredUsers == null || filteredUsers.length == 0) {
      this.admin = false;
    } else {
      let authenticatedUser = filteredUsers[0];
      let roles: string[] = authenticatedUser.roles.split(',');

      if (roles.indexOf('admin') >= 0) {
        this.admin = true;
      }
    }
  }

}
