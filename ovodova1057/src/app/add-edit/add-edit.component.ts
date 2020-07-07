import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public href: string = this.router.url;
  public selectedProduct: Product;
  public products: Product[] = [];
  public productForm: FormGroup;
  public id: number;
  constructor(private productsService: ProductsService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.productForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      owner: new FormControl(null),
      category: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(0)])
    });
  }

  async ngOnInit() {
    if (this.href === '/productsAdd') {
      try {
        const products = await this.productsService.getProducts();
        this.products = (isNullOrUndefined(products)) ? [] : products;
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let id;
        this.activatedRouter.params.subscribe(param => {
          id = param.id;
        });
        this.id = id
        const selectedProduct = await this.productsService.getProductById(id);
        this.selectedProduct = (isNullOrUndefined(selectedProduct)) ? [] : selectedProduct;
        this.productForm.patchValue({
          id: this.selectedProduct.id,
          name: this.selectedProduct.name,
          code: this.selectedProduct.code,
          price: this.selectedProduct.price,
          owner: this.selectedProduct.owner,
          category: this.selectedProduct.category,
          weight: this.selectedProduct.weight,
          amount: this.selectedProduct.amount
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
  async onProductFormSubmit() {
    if (this.href === '/productsAdd') {
      try {
        const product = this.productForm.value;
        await this.productsService.postProduct(product);
        await this.router.navigate(['/list']);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await this.productsService.putProductById(this.productForm.value.id, this.productForm.value);
        await this.router.navigate(['/list']);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async deleteProduct(id) {
    try {
      await this.productsService.deleteProductById(id);
      await this.router.navigate(['/list']);
    } catch (err) {
      console.log(err);
    }
  }
}
