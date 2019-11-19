import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'role': new FormControl('user')
    });
  }



  onSubmit() {

    this.authService.recieveUsers().subscribe((usersResponse) => {
      if (usersResponse.filter(user => user.email === this.signupForm.value.email).length) {
        this.snackBar.open('User with this email already exists!','OK',{ 
          duration: 3000});
      } else {
        this.authService.signUp(this.signupForm.value).subscribe((responseData: FormGroup) => {
          console.log(responseData);
          this.snackBar.open('You have successfully registered!','',{ 
            duration: 3000});
          this.signupForm.reset();
        })
      }
    })
  }
}
