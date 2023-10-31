import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthserviceService } from '../authentication/authservice.service';
import { NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn!: boolean

  constructor(private auth : AuthserviceService, private router : Router) {
    this.loggedIn = this.auth.isLoggedIn()
  }


  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedIn = this.auth.isLoggedIn();
      }
    });
  }

}
