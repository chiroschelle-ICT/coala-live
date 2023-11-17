import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LeidingDetailsComponent } from './leiding-details/leiding-details.component';
// Pipes
import { AfdelingFilterPipe } from '../pipes/afdeling-filter.pipe';
import { EditUserComponent } from './edit-user/edit-user.component'


@NgModule({
  declarations: [
    AdminDashboardComponent,
    LeidingDetailsComponent,
    AfdelingFilterPipe,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
