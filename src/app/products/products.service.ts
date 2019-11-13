import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) {
    }

    recieveData() {
        return this.http.get<Product[]>('http://localhost:3000/products');
    }

    addNewProduct(p: Product): Observable<Product> {
        return this.http.post<Product>('http://localhost:3000/products', p);
    }
    deleteProduct(p: Product) {
        return this.http.delete(`http://localhost:3000/products/${p.id}`);
    }

    updateProduct(p: Product) {
        return this.http.put<Product>(`http://localhost:3000/products/${p.id}`, p);
    }

}