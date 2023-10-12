import { environment } from '../../../environments'; // Adjust the path as needed
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, collectionGroup, query, CollectionReference, where, orderBy } from 'firebase/firestore';
import { Injectable, Query } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable, from } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { Leden } from '../interfaces/leden';

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
  
  // Get lid per afdeling
  getAllLedenPerAfdeling(afdeling : any) : Observable<Leden[]>{
    const a = afdeling
    console.log('afdeling parameter Service:', afdeling); // Log the parameter
    return collectionData<Leden> (
      query(
        collection(this.db, 'leden') as CollectionReference<Leden>,
        where("afdelingId", "==", afdeling)
      )
    )
  };
  
}
