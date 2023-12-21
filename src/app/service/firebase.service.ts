import { Injectable } from '@angular/core';
import { CollectionReference, collectionData, DocumentReference, Firestore, addDoc, collection, deleteDoc, doc,  query, updateDoc, where, docData, DocumentData, getDocs } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Leden } from '../../interfaces/Leden';
import { Users } from '../../interfaces/Users';
import { Admin } from '../../interfaces/Admin';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(private storage: Storage, private db: Firestore) { }

  // --- Leden functions --- 
  // --- Leden functions --- 
  // --- Leden functions --- 
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
  // Change checkbox state
  changeCheckBoxState(lid : DocumentData, id: string) {
    const lidRef = doc(this.db, 'leden/'+id) as DocumentReference<Leden>
    return from(updateDoc(lidRef, lid))
  }

  // --- Leden Details ---
  // --- Leden Details ---
  // --- Leden Details ---
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
  
  // ---- Image Functions ----
  // ---- Image Functions ----
  // ---- Image Functions ----
  // Upload Image
  async uploadImg(path : string, file : File) : Promise<string> {
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    await task
    const url = await getDownloadURL(storageRef)
    return url
  }

  // ---- user Functions ---- 
  // ---- user Functions ---- 
  // ---- user Functions ---- 
  // Adds user to the User collection (used for admin overview)
  addUserToCollection(data: DocumentData) {
    const userCollection = collection(this.db, 'users')
    return from(addDoc(userCollection, data))
  }
  // Load Authenticated users to show on admin page
  getAuthusers() {      
    return collectionData<Users> (
      query(
        collection(this.db, 'users') as CollectionReference<Users>,
      ),
      {idField: 'Id'}
    )
  }
  // Load user per ID
  getAuthUserDetails(uId:string) {
    return collectionData<Users> (
      query(
        collection(this.db, 'users') as CollectionReference<Users>,
        where('userId', "==", uId),
      ),
      {idField: 'Id'}
    )
  }


  // Update user
  updateUser(user: any, id: string) : Observable<any>{ 
      const userRef = doc(this.db, 'users/',id) as DocumentReference<Users>
      return from(updateDoc(userRef, user))
  }
  deleteUser(id: string) {
    const userRef = doc(this.db, 'users/'+id) as DocumentReference<Users>
    return from(deleteDoc(userRef))
  }
  // ---- Misculanious functions ---
  // ---- Misculanious functions ---
  // ---- Misculanious functions ---
  generateUniqueID() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 12);
    const uniqueID = `${timestamp}${randomString}`;
    return uniqueID;
  }
  // Returns the valid Afdleing ID according to the parameter input
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
  // Returns a administrator acoording to the parameter ID
  getAdmin(uid: string | null ) {
    return docData<Admin>(
      doc(this.db, '/administrators/' + uid) as DocumentReference<Admin>
    )
  }

}
