import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { ProductsService } from 'src/app/products/products.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductsdialogComponent } from '../productsdialog/productsdialog.component';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {

  private products: Product[];

  constructor(private productService: ProductsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.productService.recieveData().subscribe((products:Product[])=>{
      this.products=products;
    },
    error=> (console.log(error)));
  }

  openDialog(product: Product){
    this.dialog.open(ProductsdialogComponent);
  }

  addProduct(product: any){
    this.productService.addNewProduct(product).subscribe(()=>{
      this.snackBar.open('Product succesfully added!', '', {duration:3000});
      this.productService.recieveData().subscribe((productsResponse: Product[]) => { this.products = productsResponse });
    })

  }
}
