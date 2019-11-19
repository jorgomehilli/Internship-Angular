import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {

  private users: User[]=[];  

  constructor(private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.recieveUsers().subscribe((usersResponse:User[])=>{
      this.users=usersResponse;
  });

}

deleteUser(index){
  this.authService.deleteUserFromDb(this.users[index]).subscribe(()=>{
    this.users.splice(index, 1);
    this.snackBar.open('Successfully removed user!','',{ 
      duration: 3000});  },
  error =>{console.log(error);});
}

}

