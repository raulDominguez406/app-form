import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

const EMAIL_LENGTH = 255;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {

  disableLoginButtom = true;
  formatErrorPassword = false;
  formatErrorEmail = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private fb: FormBuilder, private router: Router) {} // Inject Router

  ngOnInit(): void {
    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Getters for form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      // check email and password inputs
      this.checkInputs(this.loginForm);
      // Redirect to success screen if two inputs are correct
      if(!this.formatErrorEmail && !this.formatErrorPassword){
        this.router.navigate(['/success']);
      }
      // reset status of valid values if any of this are incorrect
      if(this.formatErrorEmail){
        this.loginForm.controls['email'].setErrors({'incorrect': false});
      }
      if(this.formatErrorPassword){
        this.loginForm.controls['password'].setErrors({'incorrect': false});
      }

      //Enable login buton
      if(this.formatErrorEmail && this.formatErrorPassword){
        this.disableLoginButtom = false;
      }
    }
  }

  checkInputs(inputs: FormGroup) {
    this.formatErrorEmail = false;
    this.formatErrorPassword = false;

    this.formatErrorEmail = !this.validateEmail(inputs.value.email) ? true : false;
    this.formatErrorPassword = !this.validatePassword(inputs.value.password) ? true : false;
    if(this.formatErrorEmail || this.formatErrorPassword)
      this.disableLoginButtom = true;
  }

  validateEmail(mail: string) {
    const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.match(mailformat) && mail.length < EMAIL_LENGTH) {
      return true;
    } else {
      return false;
    }
  }

  validatePassword(password: string){
    var secretFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (password.match(secretFormat)) {
      return true;
    } else {
      return false;
    }
  }
}
