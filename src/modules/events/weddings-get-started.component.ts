import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballTeam, VolleyballLeague} from "../../domain/volleyball-league.domain";
import {MdDialogRef, MdDialog} from '@angular/material';
import {WeddingService} from '../../services/wedding/wedding.service';
import {EmailService} from '../../services/email/emailservice';
import {Router} from '@angular/router';
import {Food} from '../../domain/food.domain';
import {Email} from '../../domain/email.domain';
import {WeddingsComponent} from './weddings.component';

@Component({
  selector: 'weddings-get-started-component',
  template: `
    <md-card style="width: 50%">
      <md-card-content>
        Are you interested in having your reception here? Please take a moment to provide us with some information so that we can help you get started. Some information is not required yet, but please answer as much as you can to help us assist you.
      </md-card-content>
    </md-card>
    <h2>Contact Information</h2>
    <table cellspacing="1" style="width: 75%">
      <tr>
        <td><md-input-container style="width: 100%">
          <input mdInput placeholder="First Name" [(ngModel)]="firstName" required>
        </md-input-container></td>
        <td><md-input-container style="width: 100%">
          <input mdInput placeholder="Last Name" [(ngModel)]="lastName" required>
        </md-input-container></td>
      </tr>
      <tr>
        <td><md-input-container style="width: 100%">
          <input mdInput email placeholder="Email" [(ngModel)]="email" required>
        </md-input-container></td>
        <td><md-input-container style="width: 100%">
          <input [textMask]="{mask: telephoneMask}" type="tel" mdInput placeholder="Phone" [(ngModel)]="phone" required>
        </md-input-container></td>
      </tr>
      <tr>
        <td><md-input-container style="width: 100%">
          <input mdInput placeholder="Number of Guests" [(ngModel)]="numberOfGuests" required>
        </md-input-container></td>
      </tr>
    </table>
    <h2>Dinner Selection</h2>
    <table cellspacing="1" style="width: 75%">
      <tr>
        <td>
          <md-select placeholder="Entree" [(ngModel)]="selectedEntree" style="width: 100%">
            <md-option *ngFor="let entree of entreeMenu" [value]="entree" >{{entree.name}}</md-option>
          </md-select>
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td style="width: 100%">
          <md-select placeholder="Salad" [(ngModel)]="selectedSalad" style="width: 100%">
            <md-option *ngFor="let salad of saladMenu" [value]="salad" >{{salad.name}}</md-option>
          </md-select>
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td style="width: 100%">
          <md-select placeholder="Starch" [(ngModel)]="selectedStarch" style="width: 100%">
            <md-option *ngFor="let starch of starchMenu" [value]="starch" >{{starch.name}}</md-option>
          </md-select>
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td style="width: 100%">
          <md-select placeholder="Vegetable" [(ngModel)]="selectedVegetable" style="width: 100%">
            <md-option *ngFor="let vegetable of vegetableMenu" [value]="vegetable" >{{vegetable.name}}</md-option>
          </md-select>
        </td>
      </tr>
    </table>
    <h2>Additional Services</h2>
    <section>
      <md-checkbox [(ngModel)]="dayOfCoordinator" style="margin: 0 10px">Day of Coordinator</md-checkbox>
      <md-checkbox [(ngModel)]="djServices" style="margin: 0 10px">Dj Services</md-checkbox>
      <md-checkbox [(ngModel)]="weddingCake" style="margin: 0 10px">Wedding Cake</md-checkbox>
      <md-checkbox [(ngModel)]="photography" style="margin: 0 10px">Photography</md-checkbox>
      <md-checkbox [(ngModel)]="decorations" style="margin: 0 10px">Decorations</md-checkbox>
      <md-checkbox [(ngModel)]="flowers" style="margin: 0 10px">Flowers</md-checkbox>

    </section>

    <h2>Comments/Questions</h2>
      <md-input-container style="width: 50%">
        <textarea rows="6" mdInput placeholder="Message" [(ngModel)]="message" required></textarea>
      </md-input-container>

    <br><br>
    <button md-raised-button md-ripple (click)="submitWeddingReqeust()">Submit</button>
`
})

export class WeddingsGetStartedComponent {

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  numberOfGuests = '';
  message = '';

  selectedEntree: Food;
  selectedSalad: Food;
  selectedStarch: Food;
  selectedVegetable: Food;

  foodMenu: Food[];
  entreeMenu: Food[];
  saladMenu: Food[];
  starchMenu: Food[];
  vegetableMenu: Food[];

  dayOfCoordinator: boolean;
  djServices: boolean;
  weddingCake: boolean;
  photography: boolean;
  decorations: boolean;
  flowers: boolean;

  dialogRef: MdDialogRef<any>;

  telephoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public dialog: MdDialog, private weddingService: WeddingService, private emailService: EmailService, private router : Router, private weddingsComponent : WeddingsComponent) {
  }

  ngOnInit() {
    this.weddingService.getMenu()
        .retry(2)
        .subscribe(menu => {
          this.foodMenu = menu;
          this.splitMenu();
        })
  }

  submitWeddingReqeust() {
    let email = new Email();
    email.fromEmail = this.email;
    email.toEmail = 'jake.luby@target.com';
    email.subject = 'Wedding Submission';
    let content = 'Name: ' + this.firstName + ' ' + this.lastName + '\n\n';
    content = content + 'Email: ' + this.email + ' Phone: ' + this.phone + '\n\n';
    content = content + 'Number of Guests: ' + this.numberOfGuests + '\n\n';

    content = content + 'Entree: ' + this.getEntree() + '\n\n';
    content = content + 'Salad: ' + this.getSalad() + '\n\n';
    content = content + 'Starch: ' + this.getStarch() + '\n\n';
    content = content + 'Vegetable: ' + this.getVegetable() + '\n\n';
    content = content + 'Additional Services: \n';
    if (this.dayOfCoordinator) {
      content = content + '\tDay Of Coordinator \n';
    }
    if (this.djServices) {
      content = content + '\tDj Services \n';
    }
    if (this.photography) {
      content = content + '\tPhotography \n';
    }
    if (this.weddingCake) {
      content = content + '\tWedding Cake \n';
    }
    if (this.decorations) {
      content = content + '\tDecorations \n';
    }
    if (this.flowers) {
      content = content + '\tFlowers \n';
    }
    content = content + '\nQuestions/Comments:\n\n';
    content = content + this.message;

    email.content = content;
    this.emailService.sendEmail(email);
    this.dialogRef = this.dialog.open(WeddingDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      this.weddingsComponent.selectedMenu = 'Weddings';
      this.router.navigate(['/weddings']);
    });
  }

  getEntree() : string {
    try {
      return this.selectedEntree.name;
    } catch (e) {
      return '';
    }
  }

  getSalad() : string {
    try {
      return this.selectedSalad.name;
    } catch (e) {
      return '';
    }
  }

  getStarch() : string {
    try {
      return this.selectedStarch.name;
    } catch (e) {
      return '';
    }
  }

  getVegetable() : string {
    try {
      return this.selectedVegetable.name;
    } catch (e) {
      return '';
    }
  }

  splitMenu() {
    this.entreeMenu = new Array();
    this.saladMenu = new Array();
    this.starchMenu = new Array();
    this.vegetableMenu = new Array();
    this.foodMenu.forEach(item => {
      switch (item.type) {
        case 'Entree' : {
          this.entreeMenu.push(item);
          break;
        }
        case 'Salad' : {
          this.saladMenu.push(item);
          break;
        }
        case 'Starch' : {
          this.starchMenu.push(item);
          break;
        }
        case 'Vegetable' : {
          this.vegetableMenu.push(item);
          break;
        }
      }
    });
  }

}

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

export class WeddingDialogComponent {

  constructor(public dialogRef: MdDialogRef<WeddingDialogComponent>) {
  }
}



