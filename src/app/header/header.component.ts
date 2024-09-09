import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthserviceService } from '../authentication/authservice.service';
import { NavigationEnd, Route, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { Leden } from 'src/interfaces/Leden';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn!: boolean
  test!: any
  showResults: boolean = false
  public searchText: any = '';

  constructor(private auth : AuthserviceService, private router : Router, private authService : AuthserviceService, private firebaseService : FirebaseService) {
    this.loggedIn = this.auth.isLoggedIn()
  }


  ngOnInit() {
    this.test = this.firebaseService.getAdmin(this.authService.getUid())
    console.log(this.test)

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedIn = this.auth.isLoggedIn();
      }
    });
  }

}
