import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])

    });
  }

  onSubmit() {

    this.authService.recieveUsers().subscribe((usersResponse) => {
      if (usersResponse.filter(user =>
        user.password === this.loginForm.value.password &&
        user.email === this.loginForm.value.email).length) {
        this.authService.login();
        this.router.navigate(['/home']);
        alert("Successfully logged in!");
      }
      else alert("Wrong email or password!");

    });
  }



}
