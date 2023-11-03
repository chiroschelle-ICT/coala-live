import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, deleteDoc, doc, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable, from } from 'rxjs';
import { collectionData, docData } from 'rxfire/firestore';
import { Leden } from '../interfaces/Leden';
import { Admin } from '../interfaces/Admin';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { environment } from '../../../environments'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db: Firestore;
  c: any;

  constructor(private storage: Storage) {
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
  
  // Upload Image
  async uploadImg(path : string, file : File) : Promise<string> {
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    await task
    const url = await getDownloadURL(storageRef)
    return url
  }

  generateUniqueID() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 12);
    const uniqueID = `${timestamp}${randomString}`;
    return uniqueID;
  }

}
