import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { Subscription } from 'rxjs';
import { MailService } from '../service/mail.service';

@Component({
  selector: 'app-afdeling-lijst',
  templateUrl: './afdeling-lijst.component.html',
  styleUrls: ['./afdeling-lijst.component.css']
})
export class AfdelingLijstComponent implements OnInit {

  leden: any[] = [];

  ledenAll: any[] = [];
  lidSubscription!: Subscription;
  
  afdeling!: string
  parameterValue!: number 
  inschrijvingIsChecked: boolean = false;
  isChecked!: boolean;


  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private fb : FirebaseService, private mailservice : MailService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parameterValue = params['afdelingParId']
    })
    this.onGetAfdeling(this.parameterValue)
    // this.onGetLeden()
  }

  handleCheckboxChange(lidId: any, isChecked:boolean, lid:any) {
    lid.betaald = isChecked;
    this.fb.changeCheckBoxState(lid,lid.Id)
  }

  onGetAfdeling(afId: any): void {
    const num = parseInt(afId)
    this.fb.getAllLedenPerAfdeling(num).subscribe((data: any) => {
      this.leden = data
    })
  }

  onDownloadList() {
    this.mailservice.downloadMailList(this.leden, "LedenLijst");
  }
}