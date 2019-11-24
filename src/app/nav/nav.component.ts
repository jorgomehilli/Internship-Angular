import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  getLoginState(): boolean{
    return this.authService.getState();
  }

  getAdminState():boolean{
    return this.authService.getAdmin();
  }

  getUser(){
    return this.authService.getActualUserName();
  }

  navLogout(){
    this.authService.logout();
  }
}
