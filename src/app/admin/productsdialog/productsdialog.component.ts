import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material';
import { ProductsService } from 'src/app/products/products.service';


@Component({
  selector: 'app-productsdialog',
  templateUrl: './productsdialog.component.html',
  styleUrls: ['./productsdialog.component.css']
})
export class ProductsdialogComponent implements OnInit {

  productEditForm: FormGroup;
 @Output() productAdded = new EventEmitter<any>();


  constructor(@Inject(MAT_DIALOG_DATA) public p: any,
  private productsService: ProductsService) { }

  ngOnInit() {

    this.productEditForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'imgPath': new FormControl(null, Validators.required)

    });
  }

  onSubmit(){
    console.log(this.productEditForm.value);
    this.productAdded.emit(this.productEditForm.value);
  }

}
