import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProductsService {
    constructor(private cart: CartService, private http: HttpClient) {
    }

    AddItemToCart(p: Product) {
        this.cart.AddToCart(p);
    }

    recieveData() {
        return this.http.get<Product[]>('http://localhost:3000/produktet');
    }
}