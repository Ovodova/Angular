import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends HttpClientService {
  options: HttpHeaders;
  constructor(public http: HttpClient) {
    super(http);
    this.options = new HttpHeaders();
    this.options = this.options.set('Content-Type', 'application/json');
  }
  async getProducts() {
    return this.get('products', this.options).toPromise();
  }
  async getProductById(id) {
    return this.get('products/' + id, this.options).toPromise();
  }
  async postProduct(data) {
    return this.post('products', data, this.options).toPromise();
  }
  async putProductById(id, data) {
    return this.put('products/' + id, data, this.options).toPromise();
  }
  async deleteProductById(id) {
    return this.delete('products/' + id, this.options).toPromise();
  }
}
