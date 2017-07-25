import {Component} from "@angular/core";
import {OpenBowling} from "../../domain/open-bowling.domain";
import {MdDialog} from "@angular/material";
import {OpenBowlingService} from "../../services/bowling/open-bowling.service";
@Component({
  selector: 'open-bowling-component',
  templateUrl: './open-bowling.component.html'
})

export class OpenBowlingComponent{
  openBowling : OpenBowling[];
  loadingOpenBowlingData : boolean = false;

  constructor(public dialog: MdDialog, private openBowlingService : OpenBowlingService) {}

  ngOnInit() {
    this.loadingOpenBowlingData = true;
    this.openBowlingService.getOpenBowlingTimes()
      .retry(2)
      .finally(() => this.loadingOpenBowlingData = false)
      .subscribe(openBowling =>{
        this.openBowling = openBowling;
      })
  }

  getBowlingTimes(selectedDay: string): OpenBowling[]{
    return this.openBowling.filter(bowlingTime => bowlingTime.day === selectedDay);

  }
}

