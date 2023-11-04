import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private router: Router ) { }

  private isAuthneticated = false

  loginUser() {
    this.isAuthneticated = true
    setTimeout(() => {
      this.router.navigate(['afdelingen']); 
    }, 1200)
  }
  logout() {
    this.isAuthneticated = false
    setTimeout(() => {
      this.router.navigate(['/login']); 
    }, 1200)
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthneticated
  }


}
