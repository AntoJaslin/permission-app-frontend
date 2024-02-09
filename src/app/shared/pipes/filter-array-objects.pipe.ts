import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
name: 'filter'
})
export class FilterArrayObjectsPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
        return it.teamName.toLowerCase().includes(searchText);
    });
    }
}
