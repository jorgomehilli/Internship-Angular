import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductsService] 
})
export class ProductsComponent implements OnInit {
products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.recieveData().subscribe((produktet: Product[]) =>{
      this.products = produktet;  
      console.log(this.products);
    },error => {
      console.log(error);
    })
  };
  }


