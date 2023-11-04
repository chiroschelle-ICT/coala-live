// Base Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Js Imports
import { NgChartsModule } from 'ng2-charts';
// enviroments
import { environment } from '../../environments';
// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore,  } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { Storage, provideStorage } from '@angular/fire/storage';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChartComponent } from './chart/chart.component';
import { AfdelingenComponent } from './afdelingen/afdelingen.component';
import { AfdelingLijstComponent } from './afdeling-lijst/afdeling-lijst.component';
import { LedenDetailsComponent } from './leden-details/leden-details.component';
import { RandomNumberModule } from './random-number/random-number.module'
// Modules
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationRoutingModule } from './authentication/authentication-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LedenActionsModule } from './leden-actions/leden-actions.module';
import { AddLidComponent } from './add-lid/add-lid.component'; // Import FormsModule
import { from } from 'rxjs';
import { getStorage } from 'firebase/storage';
import { HoverDirective } from './afdeling-lijst/hover.directive';
import { CommonModule } from '@angular/common';
import { SortByNamePipe } from './pipes/sort-by-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ChartComponent,
    AfdelingenComponent,
    AfdelingLijstComponent,
    LedenDetailsComponent,
    AddLidComponent,
    HoverDirective,
    SortByNamePipe,
    
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
    AuthenticationModule,
    AuthenticationRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    LedenActionsModule,    
    RandomNumberModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
