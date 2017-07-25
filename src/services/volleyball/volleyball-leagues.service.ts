
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {VolleyballLeague, VolleyballTeam, VolleyballGame, Playoff} from "../../domain/volleyball-league.domain";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Injectable()
export class VolleyballLeaguesService {

  constructor(private http: Http, public snackBar: MdSnackBar) {

  }

  openSnackBar(message: string) {
    let snackbarConfig : MdSnackBarConfig = new MdSnackBarConfig();
    snackbarConfig.duration = 2000;
    this.snackBar.open(message, null, snackbarConfig);
  }

  getLeagues() : Observable<VolleyballLeague[]> {
    return this.http.get(`/api/volleyball_leagues`)
      .map((res: any) => res.json())
      .map(json => {
        var volleyballLeague : VolleyballLeague[] = json;
        return volleyballLeague;
      })
  }

  saveLeagues(leagues: VolleyballLeague[]): Promise<any> {
    return this.http.post(`/api/volleyball_leagues`, leagues)
      .map(res => res.json())
      .finally(() => this.openSnackBar("Leagues Saved"))
      .toPromise();
  }

  getOrderedLeagues(leagues: VolleyballLeague[]) : VolleyballLeague[] {
    var orderedLeagues : VolleyballLeague[] = new Array();
    leagues.forEach( league => {
      if (orderedLeagues.length == 0) {
        orderedLeagues.push(league);
      } else {
        var inserted : boolean = false;
        orderedLeagues.forEach(leagueInOrder => {
          if (this.isBefore(league, leagueInOrder) && !inserted) {
            orderedLeagues.splice(orderedLeagues.indexOf(leagueInOrder), 0, league);
            inserted = true;
          } else if (orderedLeagues.indexOf(leagueInOrder) == orderedLeagues.length - 1  && !inserted) {
            orderedLeagues.push(league);
            inserted = true;
          }
        })
      }
    });
    return orderedLeagues;
  }

  private isBefore(beforeLeague : VolleyballLeague, afterLeague : VolleyballLeague) {
    if (this.isDayBefore(beforeLeague.day, afterLeague.day)) {
      return true;
    } else if (this.isDayBefore(afterLeague.day, beforeLeague.day)) {
      return false;
    } else {
      if (beforeLeague.name < afterLeague.name) {
        return true;
      } else {
        return false;
      }
    }
  }

  private isDayBefore(beforeDay : string, afterDay) : boolean {
    switch (beforeDay) {
      case 'Sunday' : {
        if (afterDay == 'Sunday') {
          return false;
        } else {
          return true;
        }
      }
      case 'Monday' : {
        if (afterDay == 'Sunday' || afterDay == 'Monday') {
          return false;
        } else {
          return true;
        }
      }
      case 'Tuesday' : {
        if (afterDay == 'Sunday' || afterDay == 'Monday' || afterDay == 'Tuesday') {
          return false;
        } else {
          return true;
        }
      }
      case 'Wednesday' : {
        if (afterDay == 'Sunday' || afterDay == 'Monday' || afterDay == 'Tuesday' || afterDay == 'Wednesday') {
          return false;
        } else {
          return true;
        }
      }
      case 'Thursday' : {
        return false;
      }

    }
  }

  getTeams() : Observable<VolleyballTeam[]> {
    return this.http.get(`/api/volleyball_leagues/teams`)
      .map((res: any) => res.json())
      .map(json => {
        var volleyballTeam : VolleyballTeam[] = json;
        return volleyballTeam;
      })
  }

  saveTeams(volleyball: VolleyballTeam[]): Promise<any> {
    return this.http.post(`/api/volleyball_leagues/teams`, volleyball)
      .map(res => res.json())
      .toPromise();
  }

  getSchedules() : Observable<VolleyballGame[]> {
    return this.http.get(`/api/volleyball_leagues/schedules`)
      .map((res: any) => res.json())
      .map(json => {
        var volleyballGame : VolleyballGame[] = json;
        return volleyballGame;
      })
  }

  saveSchedules(volleyball: VolleyballGame[]): Promise<any> {
    console.log("saving schedules");
    return this.http.post(`/api/volleyball_leagues/schedules`, volleyball)
      .map(res => res.json())
      .finally(() => this.openSnackBar("Schedules Saved"))
      .toPromise();
  }

  getPlayoffs() : Observable<Playoff[]> {
    return this.http.get(`/api/volleyball_leagues/playoffs`)
      .map((res: any) => res.json())
      .map(json => {
        var playoff : Playoff[] = json;
        return playoff;
      })
  }

  savePlayoff(playoff: Playoff[]): Promise<any> {
    return this.http.post(`/api/volleyball_leagues/playoffs`, playoff)
      .map(res => res.json())
      .finally(() => this.openSnackBar("Playoffs Saved"))
      .toPromise();
  }


}
