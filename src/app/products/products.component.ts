import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = new Product("", "", "");

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.recieveData().subscribe((productsResponse: Product[]) => {
      this.products = productsResponse;
      console.log(productsResponse);
    }, error => {
      console.log(error);
    })
  };

  onSubmit() {

    this.productsService.addNewProduct(this.newProduct).subscribe(dataResponse => { console.log('Product added successfully!');
      this.productsService.recieveData().subscribe((productsResponse: Product[]) => { this.products = productsResponse });

    },
      error => { console.log(error) });

  }
  deleteProduct(p: Product) {
    this.productsService.deleteProduct(p).subscribe(() => {
      console.log('Product deleted successfully!');
      this.productsService.recieveData().subscribe((productsResponse: Product[]) => { this.products = productsResponse });
    });
  }

  // updateProduct (p:Product){
  //   this.newProduct=p;
  //   this.productsService.updateProduct(p).subscribe(() => {
  //     console.log('Product updated successfully!');
  //     this.productsService.recieveData().subscribe((productsResponse: Product[]) => { this.products = productsResponse });
  //   });
  //  }
}


