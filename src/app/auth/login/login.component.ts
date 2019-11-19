import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])

    });
  }

  onSubmit() {

    this.authService.recieveUsers().subscribe((usersResponse) => {
      usersResponse = usersResponse.filter(user =>
        user.password === this.loginForm.value.password &&
        user.email === this.loginForm.value.email);
        
      if (usersResponse.length) {

          console.log(usersResponse);
        this.authService.login(usersResponse[0].role);

        if(usersResponse[0].role=="admin"){
          this.router.navigate(['/admin/users']);
          this.snackBar.open('Successfully logged in as admin!','',{ 
            duration: 3000});
        }

        else{
          this.router.navigate(['/home']);
          this.snackBar.open('Successfully logged in!','',{ 
            duration: 3000});
        }
        
      }
      else this.snackBar.open('Wrong email or password!','OK',{ 
        duration: 3000});

    });
  }


}
