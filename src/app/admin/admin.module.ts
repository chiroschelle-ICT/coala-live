import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LeidingDetailsComponent } from './leiding-details/leiding-details.component';
import {RouterModule} from '@angular/router';

// Pipes
import { AfdelingFilterPipe } from '../pipes/afdeling-filter.pipe';
import { EditUserComponent } from './edit-user/edit-user.component';
// Forms
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    LeidingDetailsComponent,
    AfdelingFilterPipe,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdminModule { }
