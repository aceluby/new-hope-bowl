import {Component} from "@angular/core";
import {EmailDialogComponent} from "../contact-us/contact-us.component";
import {MdDialog, MdDialogRef} from "@angular/material";
import {Email} from '../../domain/email.domain';
import {EmailService} from '../../services/email/emailservice';
@Component({
  selector: 'corporate-events-component',
  templateUrl: './corporate-events.component.html'
})

export class CorporateEventsComponent {
  email : string;
  subject : string = 'Corporate Event Request';
  message : string;
  dialogRef: MdDialogRef<any>;

  constructor(public dialog: MdDialog, private emailService : EmailService) {}

  submitEmail() {
    let email = new Email();
    email.toEmail = 'jake.luby@target.com'
    email.fromEmail = this.email;
    email.subject = this.subject;
    email.content = this.message;
    this.emailService.sendEmail(email);
    this.resetVariables();
    this.dialogRef = this.dialog.open(EmailDialogComponent);
    this.dialogRef.componentInstance.email = this.email;
  }

  private resetVariables() {
    this.email = '';
    this.message = '';
  }
}
