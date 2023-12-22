import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Users } from 'src/interfaces/Users';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  parameterValue!: string     // The user ID
  updateForm: FormGroup

  vlaidForm: boolean = false
  showResponse: boolean = false
  responseMessage:string = ""
  bgColor!: string  
  bColor!: string
  newUid!: string
  afdeling!: string
  _password!: string
  _afdelingId!: number

  constructor(private fb : FirebaseService, private route : ActivatedRoute, private formbuilder : FormBuilder, private fire : FirebaseService)  {
    this.updateForm = this.formbuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Z]/)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^\w+\.\w+@chiroschelle\.be$/)
      ]],
      afdeling: ['', [
        Validators.required
      ]],
      rechten: ['', [
        Validators.required
        // Add Validator fcntion to check if user is Level 3 or higher (to change to lvl 3)
      ]]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parameterValue = params['userId'];
    });
    this.fb.getAuthUserDetails(this.parameterValue).subscribe(data => {
      this._password = data[0].password;
    });
  }

  OnUpdate() {
    console.log(this._password)
    const _name = this.updateForm.value.name
    const _email = this.updateForm.value.email
    const _afdeling = this.updateForm.value.afdeling
    const _afdelingId = this.fb.getAfdelingId(_afdeling)
    const _rechten = this.updateForm.value.rechten
    console.log(_afdeling)
    const UpdatedUser = {
      name: _name,
      email: _email,
      password: this._password,
      afdeling: _afdeling,
      afdelingId: _afdelingId,
      rights: _rechten,
      userId: this.parameterValue
    }

    if(!this.updateForm.valid) {
      this.showResponse = true
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
      this.responseMessage = "Fout bij Updaten Gebruiker"
    } else {
      this.showResponse = true
      this.bgColor = "#9fff96"
      this.bColor = "3px solid green"
      this.responseMessage = "Nieuwe gebruiker aangemaakt"
      this.updateUser(UpdatedUser);
      setTimeout(() =>{
        this.showResponse = false
      }, 1000)
    }    
  }

  updateUser(user: any) {
    this.fb.updateUser(user, this.parameterValue);
  }


}
