import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable} from 'rxjs';

@Injectable()
export class AuthService {

    private isLoggedIn = false;

    constructor(private http: HttpClient) {
    }

    recieveUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/users');
    }

    signUp(formValue: any) {
        return this.http.post('http://localhost:3000/users', formValue);
    }

    isAuthenticated() {

        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.isLoggedIn);
                }, 500);
            }
        );
        return promise;
    }


    login() {
        this.isLoggedIn = true;
        console.log(this.isLoggedIn);
    }

    logout() {
        this.isLoggedIn = false;
        console.log(this.isLoggedIn);
    }

    getState():boolean{
        return this.isLoggedIn;
    }



}
