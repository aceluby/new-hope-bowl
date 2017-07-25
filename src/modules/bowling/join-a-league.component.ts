import {Component} from "@angular/core";
import {MdDialogRef, MdDialog} from "@angular/material";
import {BowlingLeaguesService} from "../../services/bowling/bowling-leagues.service";
import {BowlingLeague} from "../../../server/api/bowling/leagues";

@Component({
  selector: 'join-a-league-component',
  templateUrl: './join-a-league.component.html'
})

export class JoinALeagueComponent {

  leagues : BowlingLeague[];

  selectedDay = '';
  selectedLeague = '';

  teamName : string;
  managerFirstName : string;
  managerLastName : string;
  managerEmail : string;
  managerPhone : string;

  loadingBowlingLeagueData : boolean = false;

  telephoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  dialogRef: MdDialogRef<any>;

  constructor(public dialog: MdDialog, private bowlingLeaguesService : BowlingLeaguesService) {}

  ngOnInit() {
    this.loadingBowlingLeagueData = true;
    this.bowlingLeaguesService.getLeagues()
      .retry(2)
      .finally(() => this.loadingBowlingLeagueData = false)
      .subscribe(bowlingLeagues =>{
        this.leagues = bowlingLeagues;
      })
  }

  populateLeagues(day : string) : string[] {
    var possibleLeagues =  this.leagues.filter(league => league.day === day);
    var leagueNames = [];
    possibleLeagues.forEach(league => leagueNames.push(league.name));
    return leagueNames;
  }

  populateTime(selectedDay : string, selectedLeague : string) : string {
    var league = this.leagues.filter(league => league.day === selectedDay && league.name === selectedLeague).pop();
    return league.time;
  }

  resetSelectedLeague() {
    this.selectedLeague='';
  }

  submitTeam() {
    this.dialogRef = this.dialog.open(BowlingDialogComponent);
  }

  submitIndividual() {
    this.dialogRef = this.dialog.open(BowlingDialogComponent);
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

export class BowlingDialogComponent{

  constructor(public dialogRef: MdDialogRef<BowlingDialogComponent>) {}
}
