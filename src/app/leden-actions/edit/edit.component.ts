import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit  {

  // Lid Data (only 1)
  voornaam: string = ""
  name: string = ""
  department: string = ""
  afdelingId: number = 0
  hasSecondAddress: boolean = false
  // Data for 1st Parent
  email: string = "" 
  phone: string = ""
  street: string = ""
  houseNumber: string = ""
  postcode: any = ""
  city: string = ""
  geboortedatum: string = "" 
  opmerking: string =""
  // Data for 2nd Parent (not required)
  email_2: string = "" 
  phone_2: string = ""
  street_2: string = ""
  houseNumber_2: string = ""
  postcode_2: any = ""
  city_2: string = ""
  Address: string = ""
  Address_2: string = ""
  opmerking_2: string = ""
  validForm: boolean = true
  // Lid's Age (-1/0/1)
  chiroAge: number = 0
  // Leiding
  isLeiding!: boolean
  payed!: boolean

  afdelingIdPreChange!: number

  bColor!: string
  bgColor!: string
  responseMessage!: string

  parameterValue!: string

  setTimeoutActive: boolean = true

  saved!: boolean
  confirmExit: boolean = false
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private firebaseservice : FirebaseService) {}

  ngOnInit(): void {
    this.fillDataOfLid()
    this.saved = false;
  }

  fillDataOfLid() {
    this.route.params.subscribe(params => {
      this.parameterValue = params['lidId']
    })

    this.firebaseservice.getLidPerId(this.parameterValue).subscribe((data: any) => {
      this.voornaam = data[0].voornaam
      this.payed = data[0].betaald
      this.name = data[0].name
      this.department = data[0].afdeling
      this.chiroAge = data[0].chiro_age
      if(this.setTimeoutActive) {
        this.afdelingIdPreChange = data[0].afdelingId
      }
      this.email = data[0].email
      this.email_2 = data[0].email_2
      this.phone = data[0].telefoon
      this.phone_2 = data[0].telefoon_2
      this.Address = data[0].Address
      this.Address_2 = data[0].Address_2
      this.opmerking = data[0].Opmerking
      this.opmerking_2 = data[0].Opmerking_2
      this.geboortedatum = data[0].geboortedatum      
      // this.geboortedatum = this.datePipe.transform(data[0].geboortedatum, 'dd-MM-yyyy');
      this.hasSecondAddress = data[0].hasSecondAddress
      /* 
      this.isLeiding = data[0].leiding !== undefined ? data[0].leiding : false;
      this.chiroAge = data[0].chiro_age !== undefined ? data[0].chiro_age : 0;
       */
      if (this.isLeiding === undefined) {
        this.isLeiding = data[0].leiding !== undefined ? data[0].leiding : false;
      } else {
        this.isLeiding = data[0].leiding;
      }
      
      if (this.chiroAge === undefined) {
        this.chiroAge = data[0].chiro_age !== undefined ? data[0].chiro_age : 0;
      } else {
        this.chiroAge = data[0].chiro_age;
      }
      

    })
  }

  // On Submit
  editLidForm(item: any) {
    this.validateForm(item);
  }

  // Check validation
  validateForm(item: any) {
    if (!item.voornaam || item.voornaam.trim() === '') {
      this.validForm = false;
      console.log("Voornaam leeg");
    } else if (!item.name || item.name.trim() === '') {
      this.validForm = false;
      console.log("Naam leeg");
    } else if (!item.email || item.email.trim() === ''){
      this.validForm = false;
      console.log("Email leeg");
    } else if (!item.phone || item.phone.trim() === '') {
      this.validForm = false;
      console.log("telefoon leeg");
    } else if (!item.Address || item.Address.trim() === ''){
      this.validForm = false;
      console.log("Address leeg");
    } else if (!item.opmerking || item.opmerking.trim() === ''){
      this.validForm = false;
      console.log("opmerking leeg");
    } else if(!item.email_2 || item.email_2.trim() === ''){
      this.email_2 = ""
    }
    if(this.hasSecondAddress){
      if (!item.phone_2 || item.phone_2.trim() === '') {
        this.validForm = false;
        console.log("phone_2 leeg");
      } else if (!item.Address_2 || item.Address_2.trim() === ''){
        this.validForm = false;
        console.log("Address_2 leeg");
      } else if (!item.opmerking_2 || item.opmerking_2.trim() === ''){
        this.opmerking_2 = "/"
        console.log("opmerking_2 leeg");
      }
    } else {
      this.Address_2 = "/"
      this.opmerking_2 = "/"
      this.phone_2 = "/"
      this.hasSecondAddress = false
    }
    if(this.validForm) {
      console.log("Form Valid")
      this.editData(item)
    } else if (!this.validForm) {
      this.confirmExit = true;
      this.responseMessage = "Vul Alle Velden In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    }
    
  }

  // Handle and Edit the data
  editData(item: any) {
    console.log(this.chiroAge)
    const updatedLid = {
      voornaam: this.voornaam,
      name: this.name,
      afdeling: this.department,
      afdelingId: this.firebaseservice.getAfdelingId(this.department),
      email: this.email,
      email_2: this.email_2,
      telefoon: this.phone,
      telefoon_2: this.phone_2,
      Address: this.Address,
      Address_2: this.Address_2,
      Opmerking: this.opmerking,
      Opmerking_2: this.opmerking_2,
      geboortedatum: this.geboortedatum,
      hasSecondAddress: this.hasSecondAddress,
      chiro_age: this.chiroAge,
      leiding: this.isLeiding,
      betaald: this.payed,
    }
    this.firebaseservice.updateLid(updatedLid, this.parameterValue);
    this.responseMessage = "Lid Aangepast!";
    this.bgColor = "#9fff96";
    this.bColor = "3px solid green";
    this.setTimeoutActive = false;
    this.confirmExit = true;
    this.saved = true
    setTimeout(() => {
      this.router.navigate(['/afdelingLijst/'+this.afdelingIdPreChange])      
    }, 1000)  

  }

  canDeactive(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.saved) {
      this.responseMessage = "Annuleren zonder op te slaan?"        
      this.bColor = "3px solid #dbb61f"
      this.bgColor = "#f5d969"
      this.confirmExit = true
      return false
    }
    return true;
  }

  exitAction(res : boolean) {
    if(res) {
      this.saved = true,
      this.router.navigate(['/ledenDetails', this.parameterValue])
    } else {
      this.confirmExit = false
      
    }
  }

  OnChangeAddress() {
    this.hasSecondAddress = !this.hasSecondAddress;
  }
  OnChangeIsLeiding() {
    this.isLeiding = !this.isLeiding    
  }

  
}
