import {Component} from "@angular/core";
import {EmailDialogComponent} from "../contact-us/contact-us.component";
import {MdDialog, MdDialogRef} from "@angular/material";
@Component({
  selector: 'corporate-events-component',
  templateUrl: './corporate-events.component.html'
})

export class CorporateEventsComponent {
  email : string;
  subject : string = 'Corporate Event Request';
  message : string;
  dialogRef: MdDialogRef<any>;

  constructor(public dialog: MdDialog) {}

  submitEmail() {

    this.dialogRef = this.dialog.open(EmailDialogComponent);
    this.dialogRef.componentInstance.email = this.email;
  }
}
