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
  telefoon: string = ""
  Address: string = ""
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
      this.telefoon = data[0].telefoon
      this.Address = data[0].Address
      this.geboortedatum = data[0].geboortedatum
    })
  }

  editLidForm(item: any) {
    if (!item.voornaam || !item.voornaam.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul het voornaam veld In!";
      this.bgColor = "#fca5a5";
      this.bColor = "3px solid red";
    } else if (!item.name || !item.name.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul het naam veld In!";
      this.bgColor = "#fca5a5";
      this.bColor = "3px solid red";
    } else if (!item.email || !item.email.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul het email veld In!";
      this.bgColor = "#fca5a5";
      this.bColor = "3px solid red";
    } else if (!item.Address || !item.Address.trim()) {
      this.validForm = false;
      this.responseMessage = "Vul het address veld In!";
      this.bgColor = "#fca5a5";
      this.bColor = "3px solid red";
    } else {
      // If all fields are filled, set validForm to true (assuming you want to validate them all)
      this.firebaseservice.updateLid(item, this.parameterValue);
      this.responseMessage = "Lid Aangepast!";
      this.bgColor = "#9fff96";
      this.bColor = "3px solid green";
      this.afdelingId = this.firebaseservice.getAfdelingId(this.department)
      setTimeout(() => {
        this.router.navigate(['/afdelingLijst/'+this.afdelingId])      
      }, 1000)
    }
  }
  
}
