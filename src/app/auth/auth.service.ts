import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {

    private isLoggedIn;
    private role: string = '';
    private isAdmin;

    constructor(private http: HttpClient,
        private snackBar: MatSnackBar) {
    }

    recieveUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/users');
    }

    signUp(formValue: any) {
        return this.http.post('http://localhost:3000/users', formValue);
    }


    isAuthenticated() {

        const authObservable = Observable.create(observer => {
            observer.next(this.isLoggedIn);
        });
        return authObservable;
    }

    isAdminObservable() {

        const adminObservable = Observable.create(observer => {
            observer.next(this.isAdmin);
        });
        return adminObservable;
    }



    login(role: string) {

        this.isLoggedIn = true;
        this.role = role;
        localStorage.setItem('isLoggedIn',  JSON.stringify(this.isLoggedIn));

        if (this.role=='admin'){
            this.isAdmin=true;
            localStorage.setItem('isAdmin',  JSON.stringify(this.isAdmin));
        }

    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');

        if(localStorage.getItem('isAdmin') !== null){
            localStorage.removeItem('isAdmin');
            this.isAdmin=false;
        }
        this.snackBar.open('Successfully logged out!','',{ 
            duration: 3000});
    }

    getState(): boolean {
        if (localStorage.getItem('isLoggedIn') == null){
            this.isLoggedIn = false;
        } else{
            this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        }
        return this.isLoggedIn;
    }

    getRole() {
        return this.role;
    }

    getAdmin():boolean{
        if (localStorage.getItem('isAdmin') == null){
            this.isAdmin = false;
        } else{
            this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
        }
        
        return this.isAdmin;
    }

    deleteUserFromDb(user: User) : Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/users/${user.id}`);
    }

    updateUser(user: any) {
        return this.http.put<any>(`http://localhost:3000/users/${user.id}`, user);
    }

}
