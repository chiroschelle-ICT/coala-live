import { environment } from '../../../environments'; // Adjust the path as needed
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, collectionGroup, query, CollectionReference, where, orderBy, DocumentReference, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Injectable, Query } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable, from } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { Leden } from '../interfaces/Leden';

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
  }
  
  // Get lid per afdeling
  getAllLedenPerAfdeling(afdeling : any) : Observable<Leden[]>{
    console.log('afdeling parameter Service:', afdeling); // Log the parameter
    return collectionData<Leden> (
      query(
        collection(this.db, 'leden') as CollectionReference<Leden>,
        where("afdelingId", "==", afdeling)
      ),
      {idField: 'Id'}
    )
  };

  // Get Lid per afdeling
  getLidPerId(id: string){
    return collectionData<Leden> (
      query(
        collection(this.db, 'leden') as CollectionReference<Leden>,
        where('__name__', "==", id),
      ),
      {idField: 'Id'}
    )
  }

  // update lid
  // lid is any because error when using Leden
  updateLid(lid: any, id: string) {
    const lidRef = doc(this.db, 'leden/'+id) as DocumentReference<Leden>
    return from(updateDoc(lidRef, lid))
  }

  // Change checkbox state
  changeCheckBoxState(lid : DocumentData, id: string) {
    const lidRef = doc(this.db, 'leden/'+id) as DocumentReference<Leden>
    return from(updateDoc(lidRef, lid))
  }

  
}
