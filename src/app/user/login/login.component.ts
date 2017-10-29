import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Userapi } from '../userapi';
import { Router } from '@angular/router';
import { UserInfo } from '../../shared/model/user-info';
import { Authproviders } from '../../shared/model/authproviders.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordMessage: string;
  usernameMessage: string;
  errorMessage: string;
  loginForm: FormGroup;
  loginButtonText: string;
  loginStatus: string;
  loggedinUserName: string;
  mode: string=null;
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  private validationMessage = {
    required: 'This is field is required.',
    pattern: 'Please enter a valid email address'
  };
  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private userapi: Userapi,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginButtonText = "LOGIN";
    this.loginForm = this._fb.group({
      username: ['', Validators.compose([Validators.pattern(this.EMAIL_REGEX), Validators.required])],
      password: ['', Validators.required]
    });

    const passwordControl = this.loginForm.get('password');
    const usernameControl = this.loginForm.get('username');

    passwordControl.valueChanges.subscribe(value => {
      this.setMessage(passwordControl, 'password');
    });

    usernameControl.valueChanges.subscribe(value => {
      this.setMessage(usernameControl, 'username');
    });
  }

  setMessage(c: AbstractControl, controlName: String): void {
    this.errorMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.errorMessage = Object.keys(c.errors).map(key =>
        this.validationMessage[key]).join('');
    }
    if (controlName === 'username') {
      this.usernameMessage = this.errorMessage;
    } else if (controlName === 'password') {
      this.passwordMessage = this.errorMessage;
    }
  }

  onSubmit(provider: string): void {
    this.mode='indeterminate';
    this.loginButtonText = "Submitting...";
    this.loginStatus = null;

    let userInfo = new UserInfo;
    userInfo.username = this.loginForm.controls.username.value;
    userInfo.password = this.loginForm.controls.password.value;
    userInfo.vendor = provider;

    this.userapi.login(userInfo).then((user) => {
      this.handleSucessfulLogin(user);
    }).catch((error) => {
      this.handleInvalidLogin(error);
    })

  }

  handleInvalidLogin(error) {
    this.mode= null;
    this.loginButtonText = "LOGIN";
    this.loginStatus = "The information you have provided is incorrect."
  }

  handleSucessfulLogin(user) {
    this.mode= null;
    this.router.navigate(['/settings']);
    //   this.loggedinUserName = user.additionalUserInfo.profile.name;
  }
}
