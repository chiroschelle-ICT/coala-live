import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { debounceTime, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formbuilder : FormBuilder, private authservice : AuthserviceService, private router : Router) {
    this.signupForm = this.formbuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^\w+\.\w+@chiroschelle\.be$/)
      ],
    ],
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
  ngOnInit() {
    this.showResponse = false
  }

  onSignUp() {
    const email = this.signupForm.value.email
    const password = this.signupForm.value.password
    this.authservice.signup(email, password)
    .then((res) => {
      if(res == 'succes') {
        this.showResponse = true
        this.bgColor = "#9fff96"
        this.bColor = "3px solid green"
        this.responseMessage = "Nieuwe gebruiker aangemaakt"
        this.clearFields()
      }
    })
    setTimeout(() =>{
      this.showResponse = false
    }, 3000)
  }


  clearFields() {
    this.signupForm.reset({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }
}
 