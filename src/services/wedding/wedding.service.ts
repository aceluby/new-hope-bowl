
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Food} from '../../domain/food.domain';

@Injectable()
export class WeddingService {

  constructor(private http: Http, public snackBar: MdSnackBar) {

  }

  openSnackBar(message: string) {
    let snackbarConfig : MdSnackBarConfig = new MdSnackBarConfig();
    snackbarConfig.duration = 2000;
    this.snackBar.open(message, null, snackbarConfig);
  }

  getMenu() : Observable<Food[]> {
    return this.http.get('/api/wedding')
      .map((res: any) => res.json())
      .map(json => {
        var menu : Food[] = json;
        return menu;
      })
  }

  saveMenu(menu: Food[]): Promise<any> {
    return this.http.post('/api/wedding', menu)
      .map(res => res.json())
      .finally(() => this.openSnackBar("Menu Saved"))
      .toPromise();
  }


}
