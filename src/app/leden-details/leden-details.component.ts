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

  lidNaam!: any
  lidVoornaam!: any
  lidAfdeling!: any
  lidEmail!: any
  lidTelefoon!: any
  lidStraat!: any
  lidHuisnummer!: any
  lidGemeente!: any
  lidPostcode!: any

  isModalOpen: boolean = false

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parameterValue = params['lidId']
    })
    const num = parseInt(this.parameterValue)
    this.fb.getLidPerId(this.parameterValue).subscribe((data : any) => {
      this.leden = data
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
