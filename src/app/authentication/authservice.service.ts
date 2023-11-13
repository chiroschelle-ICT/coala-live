import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'

import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CollectionReference, collectionData, DocumentReference, Firestore, addDoc, collection, deleteDoc, doc,  query, updateDoc, where, docData, DocumentData, getFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../service/firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  token: string | null = null;
  loggedIn!: boolean
  userId!: string

  private userCollection: any

  constructor(private router : Router, private auth : Auth, private db: Firestore) {
    this.userCollection = collection(this.db, 'users');
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    }
  }

  /* 
    signup(email: string, passwd : string) : Promise<{status: string, userId: string}>{
    return createUserWithEmailAndPassword(this.auth, email, passwd)
    .catch(error => {
      console.error("ERROR with creating new user: "+error);
      return { status: 'error' }
    }).then(() => {
      
      return { status: 'succes' ,userId: "YA"}
    })
  }
  */
  signup(email: string, passwd : string) : Promise<{status: string, userId: string}>{
    return createUserWithEmailAndPassword(this.auth, email, passwd)
      .then(userCredential => {
        const uId = userCredential.user?.uid
        return { status: 'succes', userId: uId }
      }) .catch(error => {
        console.error("ERROR with creating new user: " + error); 
        return { status: 'error', userId : "ERROR"}
      });      
  }
  addNewUsertocollection(data: DocumentData) {
    const ledenCollection = collection(this.db, 'users');
    return from(addDoc(ledenCollection, data));
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
          })
          .catch(error => {
            console.error("ERROR: An Error Acured with logging in a user: ", error);
            return false;
          });
    })
    .catch(
      error => {
        console.error("ERROR with loggin in user: " + error);
        return false;
      }
    ) 
  }


  logout() : void {
    this.auth.signOut()
    this.loggedIn = false
    this.token = null
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  isLoggedIn() : boolean {
    // return this.loggedIn != null;
    return this.loggedIn;
  }

  getUid() {
    if(this.auth.currentUser) {
      return this.auth.currentUser.uid
    } else {
      return null
    }
  }

}
