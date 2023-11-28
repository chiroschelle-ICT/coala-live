import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeidingDetailsComponent } from './leiding-details.component';

describe('LeidingDetailsComponent', () => {
  let component: LeidingDetailsComponent;
  let fixture: ComponentFixture<LeidingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeidingDetailsComponent]
    });
    fixture = TestBed.createComponent(LeidingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
