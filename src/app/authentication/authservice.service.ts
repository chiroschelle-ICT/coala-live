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
    
  }


}
