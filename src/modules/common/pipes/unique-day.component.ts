import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'uniqueday',
  pure: false
})

export class UniqueDayPipe implements PipeTransform {
  transform(value: any): any{
    if(value!== undefined && value!== null){
      return _.uniqBy(value, 'day');
    }
    return value;
  }
}
