import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from 'src/app/cart/cart.service';
import { ProductsService } from '../products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { AppState, initialAppState } from '../../store/state/app.state';
import { selectUserList } from 'src/app/store/selectors/cart.selectors';
import { Subscription } from 'rxjs';
import { AddItem } from '../../store/actions/cart.actions'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  private cartProducts: any[] = [];
  private newQuantity;
  private sub: Subscription;

  constructor(private cartService: CartService,
    private productService: ProductsService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
  }

  addToCart() {

 this.sub = this.store.pipe(select(selectUserList)).subscribe(response => {
      console.log (response);
      this.cartProducts = response;
      for (let cartElement of this.cartProducts) {
        if (cartElement.p_id == this.product.id) {
          this.newQuantity = cartElement.quantity + 1;
          this.cartService.modifyProduct(cartElement, this.newQuantity).subscribe((response) => {
            console.log(response);
          });
          this.snackBar.open('Added one more ' + this.product.name + ' to the cart!', 'OK');
          return;

        }

      }
//the problem is here!
      this.cartService.addItemToCart(this.product,
        this.authService.getActualUserId()).subscribe(postData => {
          this.store.dispatch(new AddItem(this.product));
          this.snackBar.open('You added ' + postData.name + ' to the shopping cart! ', '', {
              duration: 3000
          });
      });;
    });

  }


  productGetLoginState(): boolean {
    return this.authService.getState();
  }

  getAuthRole() {
    return this.authService.getRole();
  }

//   ngOnDestroy():void{
//     this.sub.unsubscribe();
// }
}
