import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {

    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])

    });
  }

  

  onSubmit() {

    this.authService.recieveUsers().subscribe((usersResponse) => {
        if (usersResponse.filter(user => user.email === this.signupForm.value.email).length) {
          alert("Woops, something went wrong :(");
        } else {
          this.authService.signUp(this.signupForm.value).subscribe((responseData:FormGroup) => {
            console.log(responseData);
            alert("You have successfully registered!");
            this.signupForm.reset();
          })
        }
    })

      /* this.authService.signUp(this.signupForm.value).subscribe((responseData:FormGroup) => {
        console.log(responseData);
        alert("You have successfully registered!");
        this.signupForm.reset();
      },
        error => {
          alert("Woops, something went wrong :(");
        });
      }
          else alert("User with this email already exists!")
          this.signupForm.reset();
  } */
  }
}
