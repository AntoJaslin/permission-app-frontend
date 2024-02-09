import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayToObject' })

export class ArrayToObjectPipe implements PipeTransform {
  transform(array: any[], key?: string): any {
    console.log(array);
    console.log(key);
    if (!Array.isArray(array)) {
      return array;
    }
    return array.reduce((obj, item) => {
        obj[item.field] = item.header;
        console.log(obj)
        return obj;
      }, {});
  }
}