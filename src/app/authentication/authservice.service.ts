import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private router : Router, private auth : Auth) { }

  // Register new User --> only WG ICT
  signup(email: string, passwd : string) : Promise<string>{
    console.log(email + " " + passwd);
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
    return signInWithEmailAndPassword(this.auth, email, passwd)
    .catch(error => {
      console.error("ERROR With logging in user: "+error)
      return 'error';
    }).then(() => {
      return 'succes'
    })
  }


}
