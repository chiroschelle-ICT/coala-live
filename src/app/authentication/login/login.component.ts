import { Component, OnInit } from '@angular/core';
import {  NgForm,  } from '@angular/forms'
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
  
  loginValid:boolean = false

  constructor(private dataService: DataService, private authservice : AuthserviceService, private router : Router, private loginservice : AuthenticationService) {}

  ngOnInit() {
    this.loginValid = false
  }

  validateUser(item: NgForm) {
    if(!item.value.email.trim()) {
      this.validForm = false
      this.actionResponse("Vul Je email In!", false)
    } else if(!item.value.password.trim()) {
      this.validForm = false
      this.actionResponse("Vul Je wachtwoord in!", false)
    }
    if(this.validForm) {
      this.loginUser(item)
    }
  }


  loginUser(form : NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authservice.loginUser(email, password)
      .then((response) => {
        if(!response) {
          this.loginValid = false
          this.actionResponse("Foute Gegevens!", false)
        } else {
          this.loginValid = true
          this.actionResponse("U Bent Ingelogd!", true)
          setTimeout(() => {
            this.router.navigate(['/afdelingen']);
          },1500)
        }
      })
  }

  actionResponse(msg : string, color: boolean) {
    if(color) {
      this.bgColor = "#9fff96"
        this.bColor = "3px solid green"
        this.responseMessage = msg
    } else {
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
      this.responseMessage = msg
    }
  }
}


