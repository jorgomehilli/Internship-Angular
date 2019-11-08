import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from 'src/app/cart/cart.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() productDeleted = new EventEmitter<Product>();
  @Output() productChanged = new EventEmitter<Product>();

  constructor(private cartService: CartService, private productService: ProductsService) { }
  ngOnInit() {
  }

  addToCart() {
    this.cartService.addItemToCart(this.product);
  }

  onRemoveProduct() {
    this.productDeleted.emit(this.product);

  }

  onUpdateProduct() {
    this.productChanged.emit(this.product);
  }
}
