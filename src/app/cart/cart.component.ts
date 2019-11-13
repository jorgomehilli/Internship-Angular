import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  private products: Product[];

  constructor(private cartService: CartService) { };

  ngOnInit() {
    this.cartService.getProducts().subscribe((recieveData: Product[]) => { this.products = recieveData; console.log(this.products) });
  }

  deleteItem(index: number) {
    this.cartService.deleteItemFromCart(this.products[index]).subscribe( () => { this.products.splice(index, 1);
       alert("Succesfully removed item from cart!"); },
      error => {
        console.log(error);
      });

  }

}
