import { environment } from '../../../environments'; // Adjust the path as needed
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, collectionGroup, query, CollectionReference, where, orderBy, DocumentReference, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Injectable, Query } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable, from } from 'rxjs';
import { collectionData, docData } from 'rxfire/firestore';
import { Leden } from '../interfaces/Leden';
import { Admin } from '../interfaces/Admin';

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

  // delete lid
  // Add only Admins can permanatly delete Leden
  deleteLid(id: string) {
    const lidRef = doc(this.db, 'leden/'+id) as DocumentReference<Leden>
    return from(deleteDoc(lidRef))
  }
  

  // Change checkbox state
  changeCheckBoxState(lid : DocumentData, id: string) {
    const lidRef = doc(this.db, 'leden/'+id) as DocumentReference<Leden>
    return from(updateDoc(lidRef, lid))
  }


  getAfdelingId(afdeling:string) {
    switch (afdeling) {
      case "Ribbel Meisjes":
        return 1;
      case "Ribbel Jongens":
        return 2;
      case "Speelclub Meisjes":
        return 3;
      case "Speelclub Jongens":
        return 4;
      case "Kwiks":
        return 5;
      case "Rakkers":
        return 6;
      case "Tippers":
        return 7;
      case "Toppers":
        return 8;
      case "Tiptiens":
        return 9;
      case "Kerels":
        return 10;
      case "Aspi Meisjes":
        return 11;
      case "Aspi Jongens":
        return 12;
      default:
        return 0; // Return 0 for unknown departments or handle it as needed
    }
  }

  getAdmin(uid: string | null ) {
    return docData<Admin>(
      doc(this.db, '/administrators/' + uid) as DocumentReference<Admin>
    )
  }
  
}
