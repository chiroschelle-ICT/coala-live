import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  token: string | null = null;
  loggedIn!: boolean

  constructor(private router : Router, private auth : Auth) {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    }
  }

  
  signup(email: string, passwd : string) : Promise<string>{
    return createUserWithEmailAndPassword(this.auth, email, passwd)
    .catch(error => {
      console.error("ERROR with creating new user: "+error);
      return 'error'
    }).then(() => {
      return 'succes'
    })
  }

  // Login user with password and email
  loginUser(email: string, passwd: string) {
    console.log("Email And Password: \n" + email + " " + passwd)
    return signInWithEmailAndPassword(this.auth, email, passwd)
    .then(() => {
      return this.auth.currentUser?.getIdToken()
        .then(
          (token: string) => {
            this.token = token;
            this.loggedIn = true
            localStorage.setItem('token', token);
            return true;
          }
        );
    })
    .catch(
      error => {
        console.error("ERROR with loggin in user: " + error);
        return false;
      }
    );
  }

  logout() : void {
    this.auth.signOut()
    this.loggedIn = false
    this.token = null
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  isLoggedIn() : boolean {
    return this.loggedIn != null;
  }

  getUid() {
    if(this.auth.currentUser) {
      return this.auth.currentUser.uid
    } else {
      return null
    }
  }

}
