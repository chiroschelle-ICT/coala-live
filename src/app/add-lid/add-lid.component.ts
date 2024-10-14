import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-add-lid',
  templateUrl: './add-lid.component.html',
  styleUrls: ['./add-lid.component.css']
})
export class AddLidComponent implements OnInit {

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
  opmerking_2: string = ""
  // Lid's Age (-1/0/1)
  chiroAge: number = 0
  // Leiding
  isLeiding: boolean = false

  // Validation and response 
  validForm: boolean = false
  bColor!: string
  bgColor!: string
  responseMessage!: string

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private firebaseservice : FirebaseService) {}

  ngOnInit(): void {
    
  }

  submitNieuwLidForm(item: any) {

    if (!item.voornaam.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul Je voornaam In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.name.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul Je naam In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.email.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul Je email In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.email_2.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul de tweede Email In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.street.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul Je straat In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.houseNumber.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul Je huisnummer In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.postcode.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul Je postcode In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.city.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul Je gemeente In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.geboortedatum.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul Je geboortedatum In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.opmerking.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul de Opmerking In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } 
    else {
      // If all fields are filled, set validForm to true (assuming you want to validate them all)
      this.afdelingId = this.firebaseservice.getAfdelingId(this.department)
     
      // Only save the nececary amt of values to database
      if(!this.hasSecondAddress) {
        const newLid = {
          // Data Lid
          voornaam: this.voornaam,
          name: this.name,
          afdeling: this.department,
          afdelingId: this.afdelingId,
          geboortedatum: this.geboortedatum,
          email: this.email,
          email_2: this.email_2,
          chiro_age: this.chiroAge,
          betaald: false,
          leiding: this.isLeiding,
          // Data ouder 1:
          telefoon: this.phone,
          Address: this.street +" "+ this.houseNumber +" "+  this.postcode +" "+  this.city,
          Opmerking: this.opmerking,
          hasSecondAddress: this.hasSecondAddress
        };

        this.firebaseservice.addLid(newLid).then(() => {
          this.clearFormInput()
          this.bgColor = "#9fff96"
          this.bColor = "3px solid green"
          this.responseMessage = "Nieuw Lid toegevoegd!"
        }) .catch((error) => {
          this.bgColor = "#fca5a5"
          this.bColor = "3px solid red"
          this.responseMessage = "Error Met toevoegen van Lid: " + error
        });
      } else if (this.hasSecondAddress) {

        const newLid2Address = {
          // Data Lid
          voornaam: this.voornaam,
          name: this.name,
          afdeling: this.department,
          afdelingId: this.afdelingId,
          geboortedatum: this.geboortedatum,
          email: this.email,
          email_2: this.email_2,
          betaald: false,
          chiro_age: this.chiroAge,
          leiding: this.isLeiding,
          // Data ouder 1:
          telefoon: this.phone,
          Address: this.street +" "+ this.houseNumber +" "+  this.postcode +" "+  this.city,
          Opmerking: this.opmerking,
          hasSecondAddress: this.hasSecondAddress,
          // data ouder 2:
          telefoon_2: this.phone_2,
          Address_2: this.street_2 +" "+ this.houseNumber_2 +" "+  this.postcode_2 +" "+  this.city_2,
          Opmerking_2: this.opmerking_2,
        };

        this.firebaseservice.addLid(newLid2Address).then(() => {
          this.clearFormInput()
          this.bgColor = "#9fff96"
          this.bColor = "3px solid green"
          this.responseMessage = "Nieuw Lid toegevoegd!"
        }) .catch((error) => {
          this.bgColor = "#fca5a5"
          this.bColor = "3px solid red"
          this.responseMessage = "Error Met toevoegen van Lid: " + error
        });
      }

    }
  }

  OnChangeAddress() {
    this.hasSecondAddress = !this.hasSecondAddress;
  }
  OnChangeIsLeiding() {
    this.isLeiding = !this.isLeiding
  }

  clearFormInput() {
    this.voornaam = "";
    this.name = "";
    this.department = "";
    this.email = "";
    this.phone = "";
    this.street = "";
    this.houseNumber = "";
    this.postcode = "";
    this.city = "";
  }
}

