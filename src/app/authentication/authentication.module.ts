// base
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Firebase
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments';
// Component
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ]
})
export class AuthenticationModule { }
