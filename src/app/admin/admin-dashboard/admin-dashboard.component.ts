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
  

  public file: any = {};
  accounts: any[] = []
  isModalOpen!: boolean

  showResponse: boolean = false
  responseMessage:string = ""
  bgColor!: string  
  bColor!: string
  
  constructor(private fb : FirebaseService, private storage : Storage) {}

  ngOnInit() {
    this.isModalOpen = false
    this.showResponse = true
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

}
