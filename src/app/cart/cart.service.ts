import { Product } from '../products/product.model';

export class CartService{

    private cart_products: Product[] = [];
    
    getProducts(){
        return this.cart_products;
    }

    AddToCart(p:Product){ 
        this.cart_products.push(p); 
    }

    DeleteItemFromCart(i:number){
        this.cart_products.splice(i,1);

    }
    Purchase(){
        let shuma;
     
        for(let i=0;i<this.cart_products.length;i++){
          shuma = shuma + this.cart_products[i].price;
      }
        
    }
}