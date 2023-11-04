import { Component, OnInit } from '@angular/core';
import { NumberService } from '../number.service';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.css']
})
export class Child2Component  implements OnInit {

  rand!: number

  constructor(private numSer : NumberService) {}

  ngOnInit() {
    this.numSer.getNumber().subscribe((num) => {
      this.rand = num
    })
  }

}