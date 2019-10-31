import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Injectable()
export class ProductsService{
    
    private products: Product[]= [
        new Product("Ranital","15.00","https://img-new.cgtrader.com/items/771790/6b0a1548cb/medicine-pills-package-3d-model-rigged-obj-mtl-3ds-fbx-blend-dae.png"),
        new Product("Codiovan","29.60","https://static.wixstatic.com/media/04f121_1ade7959184d417c9fa6572f1c6b2607~mv2.png/v1/fill/w_576,h_576,al_c,lg_1/04f121_1ade7959184d417c9fa6572f1c6b2607~mv2.png"),
        new Product("Codiovan","29.60","https://img-new.cgtrader.com/items/771790/6b0a1548cb/medicine-pills-package-3d-model-rigged-obj-mtl-3ds-fbx-blend-dae.png")
 
    ];
      constructor(private cart:CartService){

      }
      getProducts(){
          return this.products.slice();
      }

      AddItemToCart(p:Product){
      this.cart.AddToCart(p);
      }
}