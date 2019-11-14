import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = new Product("", "", "");

  constructor(private productsService: ProductsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.productsService.recieveData().subscribe((productsResponse: Product[]) => {
      this.products = productsResponse;
      console.log(productsResponse);
    }, error => {
      console.log(error);
    })
  };

  onSubmit() {

    this.productsService.addNewProduct(this.newProduct).subscribe(dataResponse => {
      console.log('Product added successfully!');
      this.productsService.recieveData().subscribe((productsResponse: Product[]) => { this.products = productsResponse });

    },
      error => { console.log(error) });

  }
  deleteProduct(p: Product, i: number) {
    this.productsService.deleteProduct(p).subscribe(() => {
      alert('Product deleted successfully!');
      this.products.splice(i, 1);
    },
      error => {
        console.log(error);
      });
  }

  getUpdatedProduct(p: Product) {
    this.newProduct = p;
  }

  updateProduct() {
    this.productsService.updateProduct(this.newProduct).subscribe(() => {
      alert('Product updated successfully!');
      this.productsService.recieveData().subscribe((productsResponse: Product[]) => { this.products = productsResponse });
    });
  }

  updateProduct1(product: Product) {
    this.newProduct = product;
  }

  getAuthRole(){

  return this.authService.getRole();
  }
}


