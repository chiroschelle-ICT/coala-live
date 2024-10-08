import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Route, ActivatedRoute, Data, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-leden-details',
  templateUrl: './leden-details.component.html',
  styleUrls: ['./leden-details.component.css']
})
export class LedenDetailsComponent implements OnInit{

  constructor(private fb : FirebaseService, private route : ActivatedRoute, private router : Router) {}  

  leden: any[] = []
  parameterValue!: any
  detailLid!: any

  isModalOpen: boolean = false
  HadSecondAddress!: boolean

  tempAfdelingID!: number

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parameterValue = params['lidId']
    })
    const num = parseInt(this.parameterValue)
    this.fb.getLidPerId(this.parameterValue).subscribe((data : any) => {
      this.leden = data
      this.tempAfdelingID = data[0].afdelingId
      this.HadSecondAddress = data[0].hasSecondAddress
    })
  }

  openDisableModal() :  void {
    this.isModalOpen = true;
  }

  schrijfLidUit() {
    this.fb.deleteLid(this.parameterValue)
    this.router.navigate(['/afdelingLijst/'+this.leden[0].afdelingId])
  }

  closeDisableModal() : void {
    this.isModalOpen = false;
  }


}
