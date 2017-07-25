
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {News} from "../../domain/news.domain";

@Injectable()
export class NewsService {

  constructor(private http: Http) {
  }

  getNews() : Observable<News[]> {
    return this.http.get(`/api/news`)
      .map((res: any) => res.json())
      .map(json => {
        var news : News[] = json;
        return news;
      })
  }

  saveNews(news: News[]): Promise<any> {
    return this.http.post(`/api/news`, news)
      .map(res => res.json())
      .toPromise();
  }
}
