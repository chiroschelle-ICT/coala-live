import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { Subscription } from 'rxjs';

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

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private fb : FirebaseService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parameterValue = params['afdelingParId']
      console.log("Parameter value: ", this.parameterValue)
    })
    this.onGetAfdeling(this.parameterValue)
    // this.onGetLeden()
  }

  handleCheckboxChange(lidId: number, isChecked:boolean) {

    console.log('lidgeldBetaald value:', isChecked); // Add this line

    this.dataService.updateCheckboxState(lidId, isChecked)/* .subscribe(
      (response) => {
        console.log('CheckBox state update succesfully')
      },(error) => {
        console.error('Erro updating checkbnox state: ',error)
      }
      
    ) */
  }

  onGetAfdeling(afId: any): void {
    const num = parseInt(afId)
    this.fb.getAllLedenPerAfdeling(num).subscribe((data: any) => {
      this.leden = data
      console.log(this.leden)
    })
  }




/*   onGetLeden(): void {
    this.lidSubscription = this.fb.getAllLeden().subscribe((data: any) => {
      this.ledenAll = data;
    })
  } */





}