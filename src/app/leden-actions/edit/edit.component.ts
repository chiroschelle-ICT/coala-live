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

 

  editLidForm(item: any) {
  }

}
