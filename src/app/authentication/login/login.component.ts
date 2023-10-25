import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { delay } from 'rxjs';
import { users } from 'src/app/interfaces/users';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DataService } from 'src/app/service/data.service';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  

  allUsers: any[] = []
  user: any[] = []

  validForm:boolean = true
  responseMessage:string = ""

  loggedInUser: any[] = []

  username: string = ""
  email: string = ""
  password: string = ""

  bgColor!: string  
  bColor!: string
  
  loginValid = false;

  constructor(private dataService: DataService, private authservice : AuthserviceService, private router : Router, private loginservice : AuthenticationService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe((data: any[]) => {
      this.allUsers = data;
    });

  }

  validateUser(item:any) {
  if(!item.email.trim()) {
      this.validForm = false
      this.responseMessage = "Vul Je email In!"
    }
    else if(!item.password.trim()) {
      this.validForm = false
      this.responseMessage = "Vul Je wachtwoord In!"
    }

    if(this.validForm) {
          this.loginUser()
    }
    else {
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
    }    
  }


  loginUser() {
    this.authservice.loginUser(this.email, this.password)
    .then((res) => {
      if('succes') {
        this.bgColor = "#9fff96"
        this.bColor = "3px solid green"
        this.responseMessage = "U Bent Ingelogd"
        this.loginservice.loginUser();
      } else {
        this.bgColor = "#fca5a5"
        this.bColor = "3px solid red"
        this.responseMessage = "Foute Gegevens!"
      }
    })
  }

}


