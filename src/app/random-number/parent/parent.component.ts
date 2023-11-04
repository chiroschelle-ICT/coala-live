import { Component } from '@angular/core';
import { NumberService } from '../number.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  constructor(private numSer : NumberService) {}

  genRandNumb() {
    this.numSer.genRandNum();
  }

}
