import {Component, Input} from "@angular/core";
import {WeddingService} from '../../services/wedding/wedding.service';
import {Food} from '../../domain/food.domain';

@Component({
  selector: 'wedding-menu-admin-component',
  template: `
    <table cellspacing="1" style="width: 100%">
      <div *ngFor="let menuItem of menu">
        <tr>
          <td style="width: 500px"><md-input-container style="width: 100%">
              <input mdInput placeholder="Description" [value]="menuItem.name" [(ngModel)]="menuItem.name">
          </md-input-container></td>
          <td>
              <md-select placeholder="Type" [(ngModel)]="menuItem.type" required>
                <md-option *ngFor="let category of foodCategories" [value]="category" >{{category}}</md-option>
              </md-select>
          </td>
          
          <td><button md-button md-ripple (click)="removeMenuItem(menu.indexOf(menuItem))">
            <md-icon>remove</md-icon>
          </button></td>
          <td><button md-button md-ripple (click)="addNewMenuItem()" *ngIf="menu.indexOf(menuItem) == menu.length-1">
            <md-icon>add</md-icon>
          </button></td>
        </tr>
      </div>  
    </table>
    <button md-raised-button md-ripple (click)="saveMenu()">Save</button>
`
})

export class WeddingMenuComponent {

  menu : Food[];
  foodCategories = FOOD_CATEGORIES;

  constructor(private weddingService : WeddingService) {}

  ngOnInit() {
    this.weddingService.getMenu()
        .retry(2)
        .subscribe(menu =>{
          this.menu = menu;
          if (this.menu.length == 0) {
            this.addNewMenuItem();
          }
        })
  }

  addNewMenuItem() {
    this.menu.push(this.defaultMenuItem());
  }

  private defaultMenuItem() : Food {
    return {
      name: '',
      type: ''
    }
  }

  removeMenuItem(menuIndex : number) {
    if (this.menu.length > 1) {
      this.menu.splice(menuIndex, 1);
    }
  }

  saveMenu() {
    this.weddingService.saveMenu(this.menu);
  }



}


const FOOD_CATEGORIES = [
  'Entree',
  'Salad',
  'Starch',
  'Vegetable'
];

