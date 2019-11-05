import { Component, OnInit } from '@angular/core';
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

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.recieveData().subscribe((productsResponse: Product[]) => {
      this.products = productsResponse;
      console.log(productsResponse);
    }, error => {
      console.log(error);
    })
  };
}


