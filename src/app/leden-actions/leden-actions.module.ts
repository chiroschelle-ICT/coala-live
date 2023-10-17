import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
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
