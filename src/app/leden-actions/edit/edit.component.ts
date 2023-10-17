import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  voornaam: string = ""
  name: string = ""
  department: string = ""
  afdelingId: number = 0
  email: string = "" 
  phone: string = ""
  street: string = ""
  houseNumber: string = ""
  postcode: any = ""
  city: string = ""
  address: string = ""
  geboortedatum: string = "" 

  validForm: boolean = false

  bColor!: string
  bgColor!: string
  responseMessage!: string

  parameterValue!: string

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private firebaseservice : FirebaseService) {}

  ngOnInit(): void {
    this.loadParameter()
    this.fillDataOfLid()
  }

  loadParameter() {
    this.route.params.subscribe(params => {
      this.parameterValue = params['lidId']
      console.log("Parameter value: ", this.parameterValue)
    })
  }

  fillDataOfLid() {
    this.firebaseservice.getLidPerId(this.parameterValue).subscribe((data: any) => {
      this.voornaam = data[0].voornaam
      this.name = data[0].name
      this.department = data[0].afdeling
      this.email = data[0].email
      this.phone = data[0].telefoon
      this.address = data[0].Address
      this.geboortedatum = data[0].geboortedatum
    })
  }

  splitAddress(dataAddress: any) {
    const addressSplitted = this.address.split(' ');
    let houseNumberFound = false
    let postalCodeFound = false

    for(let i = 0; i < dataAddress.length; i++) {
      const comp = dataAddress;
      if (/^\d+$/.test(comp)) { // Check if the component is a numeric sequence
        if (!houseNumberFound) {
          this.houseNumber = comp
          houseNumberFound = true;
        } else {
          this.postcode = parseInt(comp, 10);
          postalCodeFound = true;
        }
      } else {
        if (!houseNumberFound) {
          this.street = this.street ? this.street + ' ' + comp : comp;
        } else if (!postalCodeFound) {
          this.city = this.city ? this.city + ' ' + comp : comp;
        }
      }
    }
  }

  editLidForm(item: any) {
  }

}
