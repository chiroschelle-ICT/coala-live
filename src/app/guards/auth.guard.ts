// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthserviceService } from '../authentication/authservice.service';
import { EditComponent } from '../leden-actions/edit/edit.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthserviceService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true; // User is authenticated, allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }

  canDeactivate(
    component: EditComponent,
    curentRoute: ActivatedRouteSnapshot,
    currentStage: RouterStateSnapshot,
    nextStage?: RouterStateSnapshot
  ) : Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactive();
  }
  
}
