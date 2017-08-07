
import {BowlingLeague} from "../../domain/bowling-league.domain";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class BowlingLeaguesService {

  constructor(private http: Http) {
  }

  getLeagues() : Observable<BowlingLeague[]> {
    return this.http.get(`/api/bowling_leagues`)
      .map((res: any) => res.json())
      .map(json => {
        var bowlingLeagues : BowlingLeague[] = json;
        return bowlingLeagues;
      })
  }

  saveLeagues(bowlingLeagues: BowlingLeague[]): Promise<any> {
    return this.http.post(`/api/bowling_leagues`, bowlingLeagues)
      .map(res => res.json())
      .toPromise();
  }

  uploadFile(event): Promise<any> {
    let fileList: FileList = event;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      /** No need to include Content-Type in Angular 4 */
      // headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(`/api/bowling_leagues/upload`, formData, options)
          .map(res => res.json())
          .catch(error => Observable.throw(error))
          .toPromise();
    }
  }

}
