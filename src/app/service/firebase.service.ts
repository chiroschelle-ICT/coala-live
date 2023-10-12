import { environment } from '../../../environments'; // Adjust the path as needed
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { from } from 'rxjs';

/* 
const app = initializeApp(environment.firebase);
const firestore = getFirestore(app);
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  private db: Firestore;
  
  constructor() {
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Add new lid
  async addLid(data: DocumentData) {
    const ledenCollection = collection(this.db, 'leden');
    return from(addDoc(ledenCollection, data));
    console.log("Ja?>")
  }
  
  
}
