import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { adminGuard } from '../guards/admin.guard';
import { LeidingDetailsComponent } from './leiding-details/leiding-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: 'AdminDashboard', component: AdminDashboardComponent, /* canActivate: [adminGuard] */ },
  { path: 'details/:userId', component: LeidingDetailsComponent, /* canActivate: [adminGuard] */ },
  { path: 'editUser/:userId', component: EditUserComponent, /* canActivate: [adminGuard] */}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
