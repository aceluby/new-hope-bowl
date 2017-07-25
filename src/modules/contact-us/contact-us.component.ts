import {Component} from "@angular/core";
import {MdDialog, MdDialogRef} from "@angular/material";
@Component({
  selector: 'contact-us-component',
  templateUrl: './contact-us.component.html'
})

export class ContactUsComponent {
  email : string;
  subject : string;
  message : string;
  dialogRef: MdDialogRef<any>;

  constructor(public dialog: MdDialog) {}

  submitEmail() {

    this.dialogRef = this.dialog.open(EmailDialogComponent);
    this.dialogRef.componentInstance.email = this.email;
  }

}

@Component({
  selector: 'email-dialog',
  template: `
    <div md-dialog-content >
      Email has been submitted!
      <br>
      We will follow up at {{email}}.
    </div>
    <div md-dialog-actions align="center">
      <button md-raised-button md-ripple (click)="dialogRef.close()" id="dialogButton">Ok</button>
    </div>
`
})

export class EmailDialogComponent{

  email : string;

  constructor(public dialogRef: MdDialogRef<EmailDialogComponent>) {}
}
