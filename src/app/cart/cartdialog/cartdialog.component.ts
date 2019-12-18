import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-cartdialog',
  templateUrl: './cartdialog.component.html',
  styleUrls: ['./cartdialog.component.css']
})
export class CartdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public products: any[],
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<CartdialogComponent>,

  ) { }

  ngOnInit() {
console.log(this.products);
  }

onClose(){
    this.matDialogRef.close(false);
}
}
