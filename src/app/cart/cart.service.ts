import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class CartService {
    constructor(private http: HttpClient,
        private snackBar: MatSnackBar
        ) { };

    getProducts() {
        return this.http.get<Product[]>('http://localhost:3000/cart');
    }

    addItemToCart(p: Product) {
        this.http.post<Product>('http://localhost:3000/cart', p)
            .subscribe(postData => { this.snackBar.open('You added '+ postData.name + ' to the shopping cart! ','',{ 
                duration: 3000}); });

    }

    deleteItemFromCart(p: Product): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/cart/${p.id}`);
    }


}
