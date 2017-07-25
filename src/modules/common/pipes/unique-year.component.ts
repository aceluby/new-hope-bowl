import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'uniqueyear',
  pure: false
})

export class UniqueYearPipe implements PipeTransform {
  transform(value: any): any{
    if(value!== undefined && value!== null){
      return _.uniqBy(value, 'year');
    }
    return value;
  }
}
