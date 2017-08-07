import {Component} from '@angular/core';
@Component({
             selector: 'weddings-component',
             templateUrl: './weddings.component.html'
           })

export class WeddingsComponent {

  mainMenu = WEDDING_MENU;
  selectedMenu: string = 'Weddings';

  constructor() {
  }

  selectMenu(menuItem: string) {
    this.selectedMenu = menuItem;
  }

}

const WEDDING_MENU = [
  'Weddings',
  'Additional Services',
  'Testimonials',
  'Get Started'
];

