import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes from '@angular/router'
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  { path: 'subParent', component: ParentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomNumberRoutingModule {}
