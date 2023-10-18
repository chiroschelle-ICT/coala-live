import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  singupForm!: FormGroup;

  constructor(private formbuilder : FormBuilder) {
    this.singupForm = this.formbuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^\w+\.\w+@chiroschelle\.be$/)
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
  responseMessage: string = ""
  bColor: string = ""
  bgColor: string = ""

  ngOnInit() {

  }

  validateNewUser() {
   
  }

}
