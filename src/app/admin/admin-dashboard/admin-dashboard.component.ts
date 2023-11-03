import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { newImg } from '../newImg';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  public file: any = {};
  images: any[] = []
  isModalOpen: boolean = true

  constructor(private fb : FirebaseService, private storage : Storage) {}

  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    this.isModalOpen = false
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
  }

  async voegFileToe() {
    const storageRef = ref(this.storage,`/leiding/${this.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,this.file);
    uploadTask.on('state_changed', (snapshot) => {
      if(!Number.isNaN(this.file.name)){
        alert('Foto toegevoegd.');
      }
      else{
        alert('Geen foto geselecteerd.');
      }
    },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
        console.log('fotokrijgbaar iop' + downloadURL);
      });
    }
    
    )
    
  }

}
