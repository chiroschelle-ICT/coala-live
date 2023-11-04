import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { LoginComponent } from '../login/login.component';
import { AuthenticationRoutingModule } from '../authentication-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder ,FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { async } from 'rxjs';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  // Create a mock for AuthserviceService
  const authServiceMock = {
    signup: (email: string, password: string) => {
      return Promise.resolve('success');
    }
  };
  const routerMock = {
    navigate: (commands: any[]) => {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
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

  // Positive Tests
  it('should validate email pattern', () => {
    const emailCheck = component.signupForm.get('email')
    emailCheck?.setValue('valid.email@chiroschelle.be')
    expect(emailCheck?.valid).toBeTrue
  });
  it('should validate password pattern',() => {
      const pwCheck = component.signupForm.get('password')
      pwCheck?.setValue('superWachtwoord123!')
      expect(pwCheck?.valid).toBeTrue
  })
  it('should succesfully sing up and redirect to login page', async () => {
    component.signupForm.setValue({
      email: 'valid.email@chiroschelle.be',
      password: 'VeranderDitWachtwoord123!',
      confirmPassword: 'VeranderDitWachtwoord123!'
    });

    const spyService = spyOn(authServiceMock, 'signup').and.callThrough();
    // const spyRouter = spyOn(routerMock, 'navigate');

    component.onSignUp();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledWith('valid.email@chiroschelle.be', 'VeranderDitWachtwoord123!');
    // expect(spyRouter).toHaveBeenCalledWith(['/login']);

  })

  
  // Negative tests
  it('should display error message incorrect email input', () => {
    const emailCheck = component.signupForm.get('email')
    emailCheck?.setValue('invalid@mail.com')

    fixture.detectChanges()

    const errorMessage = fixture.nativeElement.querySelector('.text-red-500')
    expect(errorMessage.textContent).toContain('Foute email formaat');
  });
  it('should display error message incorrect Password input', () => {
    const pwCheck = component.signupForm.get('password')
    pwCheck?.setValue('123')

    fixture.detectChanges()

    const errorMessage = fixture.nativeElement.querySelector('.text-red-500')
    expect(errorMessage.textContent).toContain('Wachtwoord moet minstens 6 tekens bevatten met 2 cijfers en 1 speciaal karakter.');
  });


});
