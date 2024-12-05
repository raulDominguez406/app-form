import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginForm  = new FormGroup({
      email: new FormControl('test@test.com'),
      password: new FormControl('Testing2@')
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test Check Inputs, both inputs correct', () => {
    const loginForm: FormGroup = new FormGroup({
      email: new FormControl('test@test.com'),
      password: new FormControl('Testing2@')
    })
    component.checkInputs(loginForm);
    expect(component.formatErrorEmail).toBeFalse();
    expect(component.formatErrorPassword).toBeFalse();
  });

  it('Test Check Inputs, both incorrect', () => {
    const loginForm: FormGroup = new FormGroup({
      email: new FormControl('testtest.com'),
      password: new FormControl('Testing@')
    })
    component.checkInputs(loginForm);
    expect(component.formatErrorEmail).toBeTrue();
    expect(component.formatErrorPassword).toBeTrue();
  });

  it('Test Check Email True', () => {
    const result = component.validateEmail("test@test.com");
    expect(result).toBeTrue();
  });

  it('Test Check Email False without @', () => {
    const result = component.validateEmail("testtest.com");
    expect(result).toBeFalse();
  });

  it('Test Check Email False without .com', () => {
    const result = component.validateEmail("test@test");
    expect(result).toBeFalse();
  });

  it('Test Check Email False without first part before @ ', () => {
    const result = component.validateEmail("@test.com");
    expect(result).toBeFalse();
  });

  it('Test Check Email False without second part after @ ', () => {
    const result = component.validateEmail("test@.com");
    expect(result).toBeFalse();
  });

  it('Test Check Password True', () => {
    const result = component.validatePassword("Testing2@");
    expect(result).toBeTrue();
  });

  it('Test Check Password False wihtout lowercase letter', () => {
    const result = component.validatePassword("testing2@");
    expect(result).toBeFalse();
  });

  it('Test Check Password False wihtout uppercase letter', () => {
    const result = component.validatePassword("TESTING2@");
    expect(result).toBeFalse();
  });

  it('Test Check Password False wihtout number', () => {
    const result = component.validatePassword("Testing@@");
    expect(result).toBeFalse();
  });

  it('Test Check Password False wihtout special character @', () => {
    const result = component.validatePassword("Testing22");
    expect(result).toBeFalse();
  });

  it('Test Check Password False, wrong length', () => {
    const result = component.validatePassword("Test2@");
    expect(result).toBeFalse();
  });

  it('Get Email', () =>{
    expect(component.email?.value).toBe("");
  });

  it('Get Passwrod', () =>{
    expect(component.password?.value).toBe("");
  });

  it('check submit actions', () =>{
    component.onSubmit();
    expect(component.formatErrorEmail).toBeFalse();
    expect(component.formatErrorPassword).toBeFalse();
  });
});
