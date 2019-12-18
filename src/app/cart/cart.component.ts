import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartdialogComponent} from '../cart/cartdialog/cartdialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  private products: any[] = [];
  private newQuantity: number;
  private products1: Observable <{ cartProducts: any []}>;

  constructor(private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    // private store: Store <{cartStore: {cartProducts: any[]}}>
  ) { };

  ngOnInit() {

    // this.products1 = this.store.select('cartStore');

    this.cartService.getProducts(this.authService.getActualUserId())
      .subscribe((recieveData: any[]) => {
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

  isEmpty(): boolean {

    if (this.products.length == 0) {
      return true;
    }
    else {
      return false;
    }
  }
  
  Checkout(products: any[]){
    let dialogRef = this.dialog.open(CartdialogComponent, {
      width: '40%',
      data: products
    });
    
    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
      }
    });
  }
}
