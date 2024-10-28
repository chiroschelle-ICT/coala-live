import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

const routes: Routes = [
    { path: 'edit/:lidId', component: EditComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ledenActionsRoutingModule { }
