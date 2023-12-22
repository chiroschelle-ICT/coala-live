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
  geboortedatum: string = "" 

  email_2: string = "" 
  phone_2: string = ""
  street_2: string = ""
  houseNumber_2: string = ""
  postcode_2: any = ""
  city_2: string = ""
  geboortedatum_2: string = "" 

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
    }
    else {
      // If all fields are filled, set validForm to true (assuming you want to validate them all)
      this.afdelingId = this.firebaseservice.getAfdelingId(this.department)
     
      const newLid = {
        voornaam: this.voornaam,
        name: this.name,
        afdeling: this.department,
        afdelingId: this.afdelingId,
        email: this.email,
        telefoon: this.phone,
        Address: this.street +" "+ this.houseNumber +" "+  this.postcode +" "+  this.city,
        betaald: false,
        geboortedatum: this.geboortedatum
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
      
    }
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
