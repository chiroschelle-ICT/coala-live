import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthserviceService } from '../authentication/authservice.service';
import { Admin } from '../interfaces/Admin';
import { FirebaseService } from '../service/firebase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {

  constructor(private authService : AuthserviceService, private firebaseService : FirebaseService) {}

  test!: any

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.firebaseService.getAdmin(this.authService.getUid())
      .pipe(map(
        (admin : Admin | undefined) => {
          if(admin) {
            return true
          } else {
            return false;
          }
        }
      ))
  }
};


