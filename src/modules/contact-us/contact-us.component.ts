import {Component} from "@angular/core";
import {MdDialog, MdDialogRef} from "@angular/material";
import {EmailService} from '../../services/email/emailservice';
import {Email} from '../../domain/email.domain';
import {Router} from '@angular/router';
@Component({
  selector: 'contact-us-component',
  templateUrl: './contact-us.component.html'
})

export class ContactUsComponent {
  email : string;
  subject : string = 'Contact Us';
  message : string;
  dialogRef: MdDialogRef<any>;

  constructor(public dialog: MdDialog, private emailService : EmailService, private router : Router) {}

  submitEmail() {
    let email = new Email();
    email.toEmail = 'jake.luby@target.com'
    email.fromEmail = this.email;
    email.subject = this.subject;
    email.content = this.message;
    this.emailService.sendEmail(email);
    this.dialogRef = this.dialog.open(EmailDialogComponent);
    this.dialogRef.componentInstance.email = this.email;
    this.dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/home']);
    });
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
