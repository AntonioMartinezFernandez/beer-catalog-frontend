import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUserAuth } from '../entities/IUserAuth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  signup(userAuthInfo: IUserAuth) {
    return this.http.post(`${this.URL}/signup`, userAuthInfo);
  }

  login(userAuthInfo: IUserAuth) {
    return this.http.post(`${this.URL}/login`, userAuthInfo);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }
}
