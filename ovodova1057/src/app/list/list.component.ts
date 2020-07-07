import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public products: Product[] = [];
  public status: boolean = false;
  constructor(private productsService: ProductsService) { }
  public search: string = '';
  async ngOnInit() {
    try {
      const products = await this.productsService.getProducts();
      this.products = (isNullOrUndefined(products)) ? [] : products;
    } catch (err) {
      console.log(err);
    }
  }
  async plusAmount(id) {
    try {
      const product = await this.productsService.getProductById(id);
      product.amount++
      await this.productsService.putProductById(id, product);
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
  async subAmount(id) {
    try {
      const product = await this.productsService.getProductById(id);
      product.amount--
      await this.productsService.putProductById(id, product);
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
  sortByPrice(products, flag) {
    if (flag == 1) {
      this.products = products.sort((a, b) => {
        return b.price - a.price
      })
    } else {
      this.products = products.sort((a, b) => {
        return a.price - b.price
      })
    }
  }
  sortByAmount(products, flag) {
    if (flag == 1) {
      this.products = products.sort((a, b) => {
        return b.amount - a.amount
      })
    } else {
      this.products = products.sort((a, b) => {
        return a.amount - b.amount
      })
    }
  }
  filterByAmount(products, status) {
    if (!status) {
      this.products = products.filter((product => product.amount > 0))
      this.status = !status
    } else {
      this.status = !status
      this.ngOnInit()
    }
  }
}
