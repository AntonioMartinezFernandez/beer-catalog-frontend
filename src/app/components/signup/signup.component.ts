import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  user = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  signup() {
    this.authService.signup(this.user).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleResponse(response: any) {
    console.log('Signup OK');
    this.router.navigate(['/login']);
  }

  handleError(error: any) {
    console.log(error);
  }
}
