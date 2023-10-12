import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FirebaseService } from '../service/firebase.service';
import { Subscriber } from 'rxjs'

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
    }
    else {
      // If all fields are filled, set validForm to true (assuming you want to validate them all)
      this.afdelingId = this.getAfdelingId(this.department)
     
      const newLid = {
        voornaam: this.voornaam,
        name: this.name,
        afdeling: this.department,
        afdelingId: this.afdelingId,
        email: this.email,
        telefoon: this.phone,
        Address: this.street +" "+ this.houseNumber +" "+  this.postcode +" "+  this.city,
        betaald: false
      };

      this.firebaseservice.addLid(newLid).then(() => {
        this.clearFormInput()
        console.log('Data added to Firestore successfully.');
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

  getAfdelingId(afdeling:string) {
    switch (afdeling) {
      case "Ribbel Meisjes":
        return 1;
      case "Robbel Jongens":
        return 2;
      case "Speelclub Meisjes":
        return 3;
      case "Speelclub Jongens":
        return 4;
      case "Kwiks":
        return 5;
      case "Rakkers":
        return 6;
      case "Tippers":
        return 7;
      case "Toppers":
        return 8;
      case "Tiptiens":
        return 9;
      case "Kerels":
        return 10;
      case "Aspi Meisjes":
        return 11;
      case "Aspi Jongens":
        return 12;
      default:
        return 0; // Return 0 for unknown departments or handle it as needed
    }
  }

}
