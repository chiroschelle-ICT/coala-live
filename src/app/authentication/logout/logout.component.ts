import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private loginAuth : AuthenticationService, private router: Router) {}

  responseMessage:string = ""
  bgColor!: string  
  bColor!: string

  logoutUser() {
    this.loginAuth.logout();
    this.responseMessage = "U Bent Uitgelogd!"
    this.bgColor = "#9fff96"
    this.bColor = "3px solid green"
  }
  
}
