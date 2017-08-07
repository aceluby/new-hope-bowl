import {Component} from "@angular/core";
import {News} from "../../domain/news.domain";
import {NewsService} from "../../services/news/news.service";
@Component({
  selector: 'home-component',
  templateUrl: './home.component.html'
})

export class HomeComponent {

  news : News[];
  applicableNews : News[];

  constructor(private newsService : NewsService) {}

  ngOnInit() {
    this.newsService.getNews()
      .retry(2)
      .subscribe(serverNews =>{
        this.news = serverNews;
        this.applicableNews = this.getApplicableNews();

      });
  }

  private getApplicableNews() {
    let today = Date.now();
    return this.news.filter(newsLine => this.isApplicableNewsLine(today, newsLine));
  }

  private isApplicableNewsLine(today: number, newsLine) : boolean {
    return today >= this.parseDate(newsLine.startDate).getTime() && today <= this.parseDate(newsLine.endDate).getTime();
  }

  private parseDate(dateString) : Date {
    let parsedDate = dateString.split(/[^0-9]/);
    return new Date(parsedDate[2],parsedDate[0]-1,parsedDate[1]);
  }
}
