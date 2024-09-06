import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formbuilder : FormBuilder, private authservice : AuthserviceService, private fire : FirebaseService) {
    this.signupForm = this.formbuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^\w+\.\w+@chiroschelle\.be$/)
      ],
     ],
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Z]/)
      ]],
      afdeling: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6), Validators.pattern(/^(?=.*[0-9].*[0-9])(?=.*[!|?]).{6,}$/)
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    });
  }
/* 
  email: string = ""
  password: string = ""
  confirmPassword: string = ""
 */
  validForm: boolean = false
  responseMessage:string = ""
  bgColor!: string  
  bColor!: string
  showResponse!: boolean

  newUid!: string
  afdeling!: string

  ngOnInit() {
    this.showResponse = false
  }

  onSignUp() {
    const email = this.signupForm.value.email
    const password = this.signupForm.value.password
    const afdeling = this.signupForm.value.afdeling

    this.authservice.signup(email, password)                // Create user in Authentication
    .then((res) => {
      this.newUid = res.userId
      if(res.status != 'error') {
        this.showResponse = true
        this.bgColor = "#9fff96"
        this.bColor = "3px solid green"
        this.responseMessage = "Nieuwe gebruiker aangemaakt"
        this.ActivateCreateUserDocument()
        this.clearFields()
        setTimeout(() =>{
          this.showResponse = false
        }, 3000)
      } else {
        this.showResponse = true
        this.bgColor = "#fca5a5"
        this.bColor = "3px solid red"
        this.responseMessage = "Fout bij aanmaken Gebruiker"
        this.clearFields()
      }
    })
  }

  ActivateCreateUserDocument() {
    const newUser = {
      email: this.signupForm.value.email,
      // password: this.authservice.encryopt(this.signupForm.value.password), // Encrypt this using key
      name: this.signupForm.value.name,
      afdeling: this.signupForm.value.afdeling,
      afdelingId: this.fire.getAfdelingId(this.signupForm.value.afdeling),
      userId: this.newUid,
      rights: 0
    }
    this.authservice.addNewUsertocollection(newUser)        // Add user in collection (to show in admin page)

  }

  clearFields() {
    this.signupForm.reset({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }
}
 