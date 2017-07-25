import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballGame, VolleyballTeam, VolleyballLeague} from "../../domain/volleyball-league.domain";
import {News} from "../../domain/news.domain";
import {NewsService} from "../../services/news/news.service";

@Component({
  selector: 'news-admin-component',
  template: `
    <table cellspacing="0">
      <div *ngFor="let newsLine of news">
        <tr>
          <td><md-input-container >
              <input mdInput placeholder="Headline" [value]="newsLine.headline" [(ngModel)]="newsLine.headline">
          </md-input-container></td>
          <td><md-input-container >
              <input mdInput placeholder="Details" [value]="newsLine.details" [(ngModel)]="newsLine.details">
          </md-input-container></td>
          <td><md-input-container>
              <input mdInput [mdDatepicker]="startDatePicker" placeholder="Choose a Start Date" [value]="newsLine.startDate" [(ngModel)]="newsLine.startDate" >
              <button mdSuffix [mdDatepickerToggle]="startDatePicker">{{newsLine.startDate}}</button>
            </md-input-container>
          <md-datepicker touchUi="true" #startDatePicker></md-datepicker></td>
          <td><md-input-container>
            <input mdInput [mdDatepicker]="endDatePicker" placeholder="Choose a End Date" [value]="newsLine.endDate" [(ngModel)]="newsLine.endDate" >
            <button mdSuffix [mdDatepickerToggle]="endDatePicker">{{newsLine.endDate}}</button>
            </md-input-container>
          <md-datepicker touchUi="true" #endDatePicker></md-datepicker></td>
          
          <td><button md-button md-ripple (click)="removeNewsLine(news.indexOf(newsLine))">
            <md-icon>remove</md-icon>
          </button></td>
          <td><button md-button md-ripple (click)="addNewNewsLine()" *ngIf="news.indexOf(newsLine) == news.length-1">
            <md-icon>add</md-icon>
          </button></td>
        </tr>
      </div>  
    </table>
    <button md-raised-button md-ripple (click)="saveNews()">Save</button>
`
})

export class NewsAdminComponent {

  @Input() news:News[];

  constructor(private newsService : NewsService) {}

  addNewNewsLine() {
    this.news.push(this.defaultNews());
  }

  private defaultNews() : News {
    return {
      headline: '',
      details: '',
      startDate: '',
      endDate: ''
    }
  }

  removeNewsLine(gameIndex : number) {
    if (this.news.length > 1) {
      this.news.splice(gameIndex, 1);
    }
  }

  saveNews() {
    let formattedNews = this.formatAllDates(this.news);
    this.newsService.saveNews(formattedNews);
  }

  private formatAllDates(inputNews : News[]) : News[] {
    let outputNews : News[] = new Array();
    inputNews.forEach(newsLine => {
      newsLine.startDate = this.formatDate(newsLine.startDate);
      newsLine.endDate = this.formatDate(newsLine.endDate);
      outputNews.push(newsLine);
    });
    return outputNews;
  }

  private formatDate(inputDate : any) : string {
    var dateFormat = require('dateformat');
    var date = Date.parse(inputDate);
    return dateFormat(date, "mm-dd-yyyy");
  }
}

