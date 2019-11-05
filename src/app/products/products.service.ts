import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) {
    }

    recieveData() {
        return this.http.get<Product[]>('http://localhost:3000/products');
    }
}