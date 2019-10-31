import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  providers:[CartService]
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;
  @Output() delete = new EventEmitter<Product>();
  constructor(private cart: CartService) { }

  ngOnInit() {
  }

}
