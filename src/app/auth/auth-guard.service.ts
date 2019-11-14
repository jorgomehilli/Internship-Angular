import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let flag = true;

        return this.authService.isAuthenticated().pipe(
            map(authenticated => {
                console.log(authenticated);
                if (!authenticated) {
                    console.log(authenticated);
                    alert('Log in first!');
                    flag = false;

                    this.router.navigate(['/authentication']);
                }
            }), map(() => flag))
    }
}