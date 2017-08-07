import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderbydate' })
export class OrderrByDatePipe implements PipeTransform {

  transform(records: Array<any>, args?: any): any {
    console.log(records);
    let sortedRecords = records.sort((a,b) => this.sortGames(a,b));
    console.log(records.sort((a,b) => this.sortGames(a,b)));
    console.log(sortedRecords);
    return sortedRecords;
  };

  private sortGames(game1, game2) : number {
    let gameOneTime = this.parseDate(game1.date).getTime();
    let gameTwoTime = this.parseDate(game2.date).getTime();
    console.log(gameOneTime - gameTwoTime);
    return gameOneTime - gameTwoTime;
  }

  private parseDate(dateString) : Date {
    let parsedDate = dateString.split(/[^0-9]/);
    console.log(dateString);
    console.log(new Date(parsedDate[2],parsedDate[0]-1,parsedDate[1],0,0));
    return new Date(parsedDate[2],parsedDate[0]-1,parsedDate[1],0,0);
  }
}
