import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AfdelingenComponent } from './afdelingen/afdelingen.component';
import { AfdelingLijstComponent } from './afdeling-lijst/afdeling-lijst.component';
import { LedenDetailsComponent } from './leden-details/leden-details.component';
import { AddLidComponent } from './add-lid/add-lid.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, /*  canActivate: [AuthGuard] */  },
  { path: 'afdelingen', component: AfdelingenComponent,/*  canActivate: [AuthGuard ]*/ },
  { path: 'afdelingLijst/:afdelingParId', component: AfdelingLijstComponent,  /* canActivate: [AuthGuard] */  },
  { path: 'ledenDetails/:lidId', component: LedenDetailsComponent,  /* canActivate: [AuthGuard] */  },
  { path: 'addLid', component: AddLidComponent, /* canActivate: [AuthGuard] */  },
  { 
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule)
  },
  {
    path: 'ledenActions',
    loadChildren: () => import('./leden-actions/leden-actions.module').then(m => m.LedenActionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
