import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-disable',
  templateUrl: './disable.component.html',
  styleUrls: ['./disable.component.css']
})
export class DisableComponent {


  @Output() closeModalEvent = new EventEmitter();

  
  closeModal() {
    this.closeModalEvent.emit();
  }
}
