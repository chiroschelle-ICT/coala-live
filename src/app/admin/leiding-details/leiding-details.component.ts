import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-leiding-details',
  templateUrl: './leiding-details.component.html',
  styleUrls: ['./leiding-details.component.css']
})
export class LeidingDetailsComponent implements OnInit {

  users: any[] = []
  parameterValue!: string
  isModalOpen: boolean = false

  constructor(private fb : FirebaseService, private router : Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parameterValue = params['userId']
    });
    this.fb.getAuthUserDetails(this.parameterValue).subscribe((data: any) => {
      this.users = data
    });
  }

  // actions
  deleteUser() {

  }

  // Modal Actions
  openDisableModal() {
    this.isModalOpen = true
  }
  closeDisableModal() {
    this.isModalOpen = false
  }

}
