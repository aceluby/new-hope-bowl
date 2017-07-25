
import {BowlingLeague} from "../../domain/bowling-league.domain";
import {Http} from "@angular/http";
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

}
