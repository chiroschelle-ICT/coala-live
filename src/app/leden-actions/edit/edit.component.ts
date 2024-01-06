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
  validForm: boolean = false

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

  

  loadParameter() {
    
  }
  
  fillDataOfLid() {
    this.route.params.subscribe(params => {
      this.parameterValue = params['lidId']
    
    })

    this.firebaseservice.getLidPerId(this.parameterValue).subscribe((data: any) => {
      this.voornaam = data[0].voornaam
      this.name = data[0].name
      this.department = data[0].afdeling
      if(this.setTimeoutActive) {
        this.afdelingIdPreChange = data[0].afdelingId
      }
      this.email = data[0].email
      this.phone = data[0].telefoon
      this.phone_2 = data[0].telefoon_2
      this.Address = data[0].Address
      this.Address_2 = data[0].Address_2
      this.opmerking = data[0].Opmerking
      this.opmerking_2 = data[0].Opmerking_2
      this.geboortedatum = data[0].geboortedatum      
      this.hasSecondAddress = data[0].hasSecondAddress
    })
  }

  editLidForm(item: any) {
    
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
    } else if (!item.Address.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul de Address In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.telefoon.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul je Telefoon numer In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.geboortedatum.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul de geboortedatum In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if (!item.Opmerking.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul de Opmerking In!";
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    } else if(this.hasSecondAddress) {
      if(!item.Address_2.trim()) {
          this.validForm = false;
          this.responseMessage = "Vul de Tweede Address In!";
          this.bgColor = "#fca5a5"
          this.bColor = "3px solid red"
        } else if(!item.Telefoon_2.trim()) {
          this.validForm = false;
          this.responseMessage = "Vul de Tweede Telefoon In!";
          this.bgColor = "#fca5a5"
          this.bColor = "3px solid red"
        } else if(!item.Opmerking_2.trim()) {
          this.validForm = false;
          this.responseMessage = "Vul de Tweede Opmerking In!";
          this.bgColor = "#fca5a5"
          this.bColor = "3px solid red"
        }
    }else if(this.validForm){
        // If all fields are filled, set validForm to true (assuming you want to validate them all)
        this.afdelingId = this.firebaseservice.getAfdelingId(this.department)
        if(!this.hasSecondAddress) {
          const updatedLid = {
            voornaam: this.voornaam,
            name: this.name,
            afdeling: this.department,
            afdelingId: this.afdelingId,
            email: this.email,
            email_2: this.email_2,
            telefoon: this.phone,
            Address: this.Address,
            betaald: false,
            Opmerking: this.opmerking,
            geboortedatum: this.geboortedatum,
            hasSecondAddress: this.hasSecondAddress
          };
            this.firebaseservice.updateLid(updatedLid, this.parameterValue);
            this.responseMessage = "Lid Aangepast!";
            this.bgColor = "#9fff96";
            this.bColor = "3px solid green";
            this.setTimeoutActive = false;
            this.saved = true
          setTimeout(() => {
            this.router.navigate(['/afdelingLijst/'+this.afdelingIdPreChange])      
            
          }, 1000)
  
        } else  {
          const updatedLid = {
            voornaam: this.voornaam,
            name: this.name,
            afdeling: this.department,
            afdelingId: this.afdelingId,
            email: this.email,
            email_2: this.email_2,
            telefoon: this.phone,
            telefoon_2: this.phone_2,
            Address: this.Address,
            Address_2: this.Address_2,
            betaald: false,
            Opmerking: this.opmerking,
            Opmerking_2: this.opmerking_2,
            geboortedatum: this.geboortedatum,
            hasSecondAddress: this.hasSecondAddress
          };
          this.firebaseservice.updateLid(updatedLid, this.parameterValue);
          this.responseMessage = "Lid Aangepast!";
          this.bgColor = "#9fff96";
          this.bColor = "3px solid green";
          this.setTimeoutActive = false;
          this.saved = true
          setTimeout(() => {
            this.router.navigate(['/afdelingLijst/'+this.afdelingIdPreChange])      
            
          }, 1000)  
        }
        this.responseMessage = "Fout met gegevens!";
        this.bgColor = "#fca5a5";
        this.bColor = "3px solid red";               
      }
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

  
}
