import { Component, OnInit } from '@angular/core';
import { NumberService } from '../number.service';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component implements OnInit {

  rand!: number

  constructor(private numSer : NumberService) {}

  ngOnInit() {
    this.numSer.getNumber().subscribe((num) => {
      this.rand = num
    })
  }

}
