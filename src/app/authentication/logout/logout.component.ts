import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authentication/authservice.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private auth : AuthserviceService, private router: Router) {}

  responseMessage:string = ""
  bgColor!: string  
  bColor!: string

  logoutUser() {
    this.auth.logout()
    this.actionResponse("U bent Uitgelogd", true)
  }
  
  actionResponse(msg : string, color: boolean) {
    if(color) {
      this.bgColor = "#9fff96"
        this.bColor = "3px solid green"
        this.responseMessage = msg
    } else {
      this.bgColor = "#fca5a5"
      this.bColor = "3px solid red"
      this.responseMessage = msg
    }
  }

}
