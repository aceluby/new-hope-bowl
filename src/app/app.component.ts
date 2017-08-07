import {Component} from '@angular/core';
import {AdminService} from '../services/admin/admin.service';
import {LoginComponent} from '../modules/login/login.component';

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.css']
           })
export class AppComponent {

  selectedPage = 'Home';

  constructor(public userService: AdminService, public loginComponent: LoginComponent) {

  }

  ngOnInit() {
    this.userService.checkUsernamePassword();
  }

  selectMenu(menuItem: string): void {
    this.selectedPage = menuItem;
  }

}

