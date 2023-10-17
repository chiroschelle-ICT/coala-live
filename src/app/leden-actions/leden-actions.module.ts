// Base Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Comoponents
import { EditComponent } from './edit/edit.component';
// Modules
import { ledenActionsRoutingModule } from './leden-actions-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ledenActionsRoutingModule,
    FormsModule
  ]
})
export class LedenActionsModule { }
