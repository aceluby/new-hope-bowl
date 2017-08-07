import {Component} from '@angular/core';
import {MdDialogRef, MdDialog} from '@angular/material';
import {BowlingLeaguesService} from '../../services/bowling/bowling-leagues.service';
import {BowlingLeague} from '../../../server/api/bowling/leagues';
import {Email} from '../../domain/email.domain';
import {EmailService} from '../../services/email/emailservice';
import {Player} from './new-player.component';

@Component({
             selector: 'join-a-league-component',
             templateUrl: './join-a-league.component.html'
           })

export class JoinALeagueComponent {

  leagues: BowlingLeague[];

  selectedDay = '';
  selectedLeague = '';

  teamName: string;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  managerPhone: string;

  individualFirstName: string;
  individualLastName: string

  loadingBowlingLeagueData: boolean = false;

  telephoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  dialogRef: MdDialogRef<any>;

  team : Player[] = [
    {firstName: "", lastName: "", email: ""}
  ];

  constructor(public dialog: MdDialog, private bowlingLeaguesService: BowlingLeaguesService, private emailService: EmailService) {
  }

  ngOnInit() {
    this.loadingBowlingLeagueData = true;
    this.bowlingLeaguesService.getLeagues()
        .retry(2)
        .finally(() => this.loadingBowlingLeagueData = false)
        .subscribe(bowlingLeagues => {
          this.leagues = bowlingLeagues;
        })
  }

  populateLeagues(day: string): string[] {
    var possibleLeagues = this.leagues.filter(league => league.day === day);
    var leagueNames = [];
    possibleLeagues.forEach(league => leagueNames.push(league.name));
    return leagueNames;
  }

  populateTime(selectedDay: string, selectedLeague: string): string {
    var league = this.leagues.filter(league => league.day === selectedDay && league.name === selectedLeague).pop();
    return league.time;
  }

  resetSelectedLeague() {
    this.selectedLeague = '';
  }

  submitTeam() {
    let email = new Email();
    email.fromEmail = this.managerEmail;
    // email.toEmail = 'tom@newhopebowl.net';
    email.toEmail = 'jake.luby@target.com';
    email.subject = 'New Bowling - Team Submission'
    email.content = this.formatTeamEmailConent();
    this.emailService.sendEmail(email);
    this.dialogRef = this.dialog.open(BowlingDialogComponent);
  }

  submitIndividual() {
    let email = new Email();
    email.fromEmail = this.managerEmail;
    email.toEmail = 'jake.luby@target.com';
    // email.toEmail = 'tom@newhopebowl.net';
    email.subject = 'New Bowling - Individual Submission'
    email.content = this.formatIndividualEmailConent();
    this.emailService.sendEmail(email);
    this.dialogRef = this.dialog.open(BowlingDialogComponent);
  }

  private formatIndividualEmailConent(): string {
    let rtnValue = 'Day: ' + this.selectedDay + ' League: ' + this.selectedLeague;
    rtnValue = rtnValue + 'Name: ' + this.individualFirstName + ' ' + this.individualFirstName + '\n';
    rtnValue = rtnValue + '\tPhone: ' + this.managerPhone + '\n';
    rtnValue = rtnValue + '\tEmail: ' + this.managerEmail + '\n';
    return rtnValue;
  }

  private formatTeamEmailConent(): string {
    let rtnValue = this.formatTeamInfo();
    rtnValue = rtnValue + this.formatManagerInfo();
    rtnValue = rtnValue + 'Team: \n';
    this.team.forEach(player => {
      rtnValue = rtnValue + this.formatPlayerInfo(player);
    });
    return rtnValue;
  }

  private formatTeamInfo(): string {
    return 'Team: ' + this.teamName + ' Day: ' + this.selectedDay + ' League: ' + this.selectedLeague;
  }

  private formatManagerInfo(): string {
    let rtnValue = ' Manager: ' + this.managerFirstName + ' ' + this.managerLastName + '\n';
    rtnValue = rtnValue + '\tPhone: ' + this.managerPhone + '\n';
    rtnValue = rtnValue + '\tEmail: ' + this.managerEmail + '\n';
    return rtnValue;
  }

  private formatPlayerInfo(player): string {
    return '\tName: ' + player.firstName + ' ' + player.lastName + ' Email: ' + player.email + '\n';
  }
}

@Component({
             selector: 'bowling-dialog',
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

export class BowlingDialogComponent {

  constructor(public dialogRef: MdDialogRef<BowlingDialogComponent>) {
  }
}
