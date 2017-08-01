import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import { User} from '../../domain/username-password.domain';

@Injectable()
export class AdminService {

  constructor(private http: Http, public snackBar: MdSnackBar) {

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

  saveUsers(users: User[]): Promise<any> {
    return this.http.post('/api/admin', users)
               .map(res => res.json())
               .finally(() => this.openSnackBar("User Saved"))
               .toPromise();
  }

}
