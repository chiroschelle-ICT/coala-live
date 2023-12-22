import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { newImg } from '../newImg';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  

  // Variables
  public file: any = {};
  isModalOpen!: boolean

  // User Collection
  userAccounts: any[] = []        // Normale Users
  adminAccounts: any[] = []       // Werkgroep
  ownerAccounts: any[] = []       // ICT Personel


  // Error / Succes handeling
  showResponse: boolean = false
  responseMessage:string = ""
  bgColor!: string  
  bColor!: string
  
  constructor(private fb : FirebaseService, private storage : Storage) {}

  ngOnInit() {
    this.isModalOpen = false
    this.showResponse = true
    this.loadUsers()

  }

  // Loading the users
  loadUsers() {
    this.fb.getAuthusers().subscribe((data) => {
      this.userAccounts = data
    })
  }

  // Closing and opening modal
  modalFunction() {
    if(this.isModalOpen) {
      this.isModalOpen = false
    } else {
      this.isModalOpen = true
    }
  }

  // Add Images
  selectFile(event: any) {
    this.file = event.target.files[0];
  }
  async voegFileToe() {
    const storageRef = ref(this.storage,`/leiding/${this.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,this.file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
      console.log('Uploadnen: ' + progress + '% done');
      if(!Number.isNaN(this.file.name)){
        this.showResponse = true
        this.actionResponse("Foto Geupload!", true)
        setTimeout(() => {
          this.isModalOpen = false
        }, 1500)
      }
      else{
        this.showResponse = true
        this.actionResponse("geen Foto Geselecteerd!", false)
      }
    },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
        console.log('fotokrijgbaar iop' + downloadURL);
      });
    }
    )   
  }

  // Fucntiont o handle the succes / fail messages
  actionResponse(msg : string, color: boolean) {
    if(color) {
      this.bgColor = "#9fff96"
        this.bColor = "3px solid green"
        this.responseMessage = msg
    } else {
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
      this.responseMessage = msg
    }
  }

  // Display afdeling as colout with tekst (make it cleaner)
  afdelingStyling(afId : number): { border: string, backgroundColor: string} {
    const colors = [
      { border: '2px solid #7e22ce', backgroundColor: '#a855f7' },       // Ribbel
      { border: '2px solid #ca8a04', backgroundColor: '#facc15' },       // Speelclub
      { border: '2px solid #15803d', backgroundColor: '#22c55e' },       // Rakwi
      { border: '2px solid #ef4444', backgroundColor: '#b91c1c' },       // Tito
      { border: '2px solid #1d4ed8', backgroundColor: '#3b82f6' },       // Keti
      { border: '2px solid #c2410c', backgroundColor: '#fb923c' },       // Aspi
    ];
    const index = Math.ceil((afId / 2) - 1)
    return colors[index]
  }


}
