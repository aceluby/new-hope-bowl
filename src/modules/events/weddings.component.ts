import {Component} from "@angular/core";
import {WeddingService} from '../../services/wedding/wedding.service';
import {Food} from '../../domain/food.domain';
import {MdDialogRef, MdDialog} from '@angular/material';
@Component({
  selector: 'weddings-component',
  templateUrl: './weddings.component.html'
})

export class WeddingsComponent {

  mainMenu = WEDDING_MENU;
  selectedMenu : string = 'Weddings';
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  numberOfGuests = '';

  selectedEntree : Food;
  selectedSalad : Food;
  selectedStarch : Food;
  selectedVegetable : Food;


  foodMenu : Food[];
  entreeMenu : Food[];
  saladMenu : Food[];
  starchMenu : Food[];
  vegetableMenu : Food[];

  dayOfCoordinator : boolean;
  djServices : boolean;
  weddingCake : boolean;
  photography : boolean;
  decorations : boolean;
  flowers : boolean;

  dialogRef: MdDialogRef<any>;

  telephoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public dialog: MdDialog, private weddingService : WeddingService) {}

  ngOnInit() {
    this.weddingService.getMenu()
        .retry(2)
        .subscribe(menu =>{
          this.foodMenu = menu;
          this.splitMenu();
        })
  }

  selectMenu(menuItem : string) {
    this.selectedMenu = menuItem;
  }

  submitWeddingReqeust() {

  }

  splitMenu() {
    this.entreeMenu = new Array();
    this.saladMenu = new Array();
    this.starchMenu = new Array();
    this.vegetableMenu = new Array();
    this.foodMenu.forEach(item => {
      console.log(item.type);
      switch (item.type) {
        case 'Entree' : {
          this.entreeMenu.push(item);
          console.log(item.type);
          break;
        }
        case 'Salad' : {
          this.saladMenu.push(item);
          console.log(item.type);
          break;
        }
        case 'Starch' : {
          this.starchMenu.push(item);
          console.log(item.type);
          break;
        }
        case 'Vegetable' : {
          this.vegetableMenu.push(item);
          console.log(item.type);
          break;
        }
      }
    });
  }

}

const WEDDING_MENU = [
  'Weddings',
  'Additional Services',
  'Testimonials',
  'Get Started'
];

@Component({
             selector: 'wedding-dialog',
             template: `
    <div md-dialog-content>
      Your request has been submitted!
      <br>
      We will follow up via the phone or email provided.
    </div>
    <div md-dialog-actions align="center">
      <button md-raised-button md-ripple (click)="dialogRef.close()" id="dialogButton">Ok</button>
    </div>
`
           })

export class WeddingDialogComponent{

  constructor(public dialogRef: MdDialogRef<WeddingDialogComponent>) {}
}

