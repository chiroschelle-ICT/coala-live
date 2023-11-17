import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authentication/authservice.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  signupForm: FormGroup;

  constructor(private formbuilder : FormBuilder, private router : Router, private fire : FirebaseService) {
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

  validForm: boolean = false

  bColor!: string
  bgColor!: string
  responseMessage!: string

  parameterValue!: string

  setTimeoutActive: boolean = true
  
  saved!: boolean
  confirmExit: boolean = false


  onSignUp() {
    
  }



  
  exitAction(res : boolean) {
    if(res) {
      this.saved = true,
      this.router.navigate(['/adminDashboard', this.parameterValue])
    } else {
      this.confirmExit = false
      
    }
  }

}
