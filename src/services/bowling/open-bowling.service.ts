
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {OpenBowling} from "../../domain/open-bowling.domain";

@Injectable()
export class OpenBowlingService {

  constructor(private http: Http) {
  }

  getOpenBowlingTimes() : Observable<OpenBowling[]> {
    return this.http.get(`/api/open_bowling`)
      .map((res: any) => res.json())
      .map(json => {
        var openBowling : OpenBowling[] = json;
        return openBowling;
      })
  }

  saveOpenBowling(openBowlingTimes: OpenBowling[]): Promise<any> {
    return this.http.post(`/api/open_Bowling`, openBowlingTimes)
      .map(res => res.json())
      .toPromise();
  }
}
