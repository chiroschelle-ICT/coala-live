import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SignupComponent,  canActivate: [adminGuard] },
  { path: 'logout', component: LogoutComponent, /*canActivate: [AuthGuard]*/ },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
