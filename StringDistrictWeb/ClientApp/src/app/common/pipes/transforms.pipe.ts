import { PipeTransform, Pipe, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable()

export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    if (!value || value.length == 0) return items;
    var filteredItems = items.filter(it =>
      it[field] == value);
    return filteredItems;
  }
}
