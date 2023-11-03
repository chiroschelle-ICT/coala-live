import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormBuilder ,FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  // Create a mock for AuthserviceService
  const authServiceMock = {
    signup: () => {
      // Implement a mock behavior for the signup method
      return Promise.resolve('success'); // Or return a suitable response
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder, 
        { provide: AuthserviceService, useValue: authServiceMock },
      ],
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 

    // ddd
  });

  // Test Cases go here:
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email pattern', () => {
    const emailCheck = component.signupForm.get('email')

    // set A Valid email
    emailCheck?.setValue('valid.email@chiroschelle.be')
    expect(emailCheck?.valid).toBeTrue
  });
});
