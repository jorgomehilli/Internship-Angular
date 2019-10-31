import { Component, OnInit, EventEmitter } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private products: Product[];

  constructor(private cart: CartService) { }

  ngOnInit() {
   this.products=this.cart.getProducts();
  }
  deleteItem(index:number){
this.cart.DeleteItemFromCart(index);
  }

}
