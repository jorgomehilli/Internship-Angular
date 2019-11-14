import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    private isLoggedIn = false;
    private role: string = '';

    constructor(private http: HttpClient) {
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


    login(role: string) {
        this.isLoggedIn = true;
        this.role = role;
        console.log(this.isLoggedIn, this.role);
    }

    logout() {
        this.isLoggedIn = false;
        console.log(this.isLoggedIn);
    }

    getState(): boolean {
        return this.isLoggedIn;
    }

    getRole() {
        return this.role;
    }


}
