import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthenticationService } from '../service/authentication.service';
import { NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn!: boolean

  constructor(private loginAuth : AuthenticationService, private router : Router) {
    this.loggedIn = this.loginAuth.isAuthenticatedUser();
  }


  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedIn = this.loginAuth.isAuthenticatedUser();
      }
    });
  }

}
