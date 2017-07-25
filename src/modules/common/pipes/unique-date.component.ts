import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'uniquedate',
  pure: false
})

export class UniqueDatePipe implements PipeTransform {
  transform(value: any): any{
    if(value!== undefined && value!== null){
      return _.uniqBy(value, 'date');
    }
    return value;
  }
}
