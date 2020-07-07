import { Pipe, PipeTransform } from '@angular/core';
import { isArray, isNullOrUndefined } from 'util';
import { Product } from '../models/product.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], search: string): any {
    if (!isNullOrUndefined(products) && search.trim().length > 0) {
      return products.filter(product => (product.category.toLocaleLowerCase().includes(search.toLowerCase())));
    } else {
      return products;
    }
  }
}
