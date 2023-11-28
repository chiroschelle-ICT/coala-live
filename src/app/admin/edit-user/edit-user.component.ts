import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authentication/authservice.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Users } from '../../../interfaces/Users'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  // Reactive form stuff
  editUserForm: FormGroup;
  user!: Users

  naam!: string
  email!: string
  afdeling!: string
  rechten!: number
  
  // Response Valuesan
  validForm: boolean = false
  bColor!: string
  bgColor!: string
  responseMessage!: string

  // Misc Values
  parameterValue!: string
  setTimeoutActive: boolean = true
  saved!: boolean
  confirmExit: boolean = false

  constructor(private router : Router, private fb : FirebaseService, private formbuilder : FormBuilder, private route : ActivatedRoute) {
    this.editUserForm = this.formbuilder.group({
      naam: ['', [
        Validators.required,
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
        Validators.required,
      ]],
    });
  }
  ngOnInit():void {
    this.route.params.subscribe((data) => {
      this.parameterValue = data['userId'];
    });
    this.fb.getAuthUserDetails(this.parameterValue).subscribe((data: any) => {
      this.editUserForm.patchValue({
        naam: data[0].name,
        email: data[0].email,
        afdeling: data[0].afdeling,
        rechten: data[0].rights
      });
    });
  }


  // Update the user (Validation is done in constructor)
  onEditUser() {
    const updatedUser = { 
      afdeling: this.editUserForm.value.afdeling,
      afdelingId: this.fb.getAfdelingId(this.editUserForm.value.afdeling),
      email: this.editUserForm.value.email,
      name: this.editUserForm.value.naam,
      rights: this.editUserForm.value.rechten
    }
    console.log(this.editUserForm.value.afdeling)
    this.fb.updateUser(updatedUser, this.parameterValue);
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
