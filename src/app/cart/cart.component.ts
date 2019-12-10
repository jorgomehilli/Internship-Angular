import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  private products: any[] = [];
  private sum: any = 0;
  newQuantity: number;

  constructor(private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { };

  ngOnInit() {
    this.cartService.getProducts(this.authService.getActualUserId())
      .subscribe((recieveData: any) => {
        this.products = recieveData;
        console.log(this.products);
      });
  }

  deleteItem(index: number) {
    this.cartService.deleteItemFromCart(this.products[index].id)
      .subscribe(() => {
        this.products.splice(index, 1);
        this.snackBar.open('Successfully removed item from cart!', '', {
          duration: 3000
        });
      },
        error => {
          console.log(error);
        });

  }

  incrementQuantity(product: any) {

    if (product.quantity >= 5) return;

    this.newQuantity = product.quantity + 1;
    this.cartService.modifyProduct(product, this.newQuantity).subscribe((modified) => {
      console.log(modified);
      product.quantity = this.newQuantity;
    })
    error => { console.log(error); }

  }

  decrementQuantity(product: any) {

    if (product.quantity <= 1) return;

    this.newQuantity = product.quantity - 1;
    this.cartService.modifyProduct(product, this.newQuantity).subscribe((modified) => {
      console.log(modified);
      product.quantity = this.newQuantity;
    });
    error => { console.log(error); }

  }

  // Purchase() {

  //   for (let i = 0; i < this.products.length; i++) {

  //     this.cartService.deleteItemFromCart(this.products[i]).subscribe(() => {
  //     });
  //   }
  //   this.products = [];
  //   this.snackBar.open('Success!', '', { duration: 3000 });

  // }

  isEmpty(): boolean {

    if (this.products.length == 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
