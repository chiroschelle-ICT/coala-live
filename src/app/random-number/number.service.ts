import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor() { }

  private number = new Subject<number>()

  getNumber() {
    return this.number.asObservable()
  }
  genRandNum() {
    const rand = Math.floor(Math.random() * 100)
    this.number.next(rand)
  }

}
