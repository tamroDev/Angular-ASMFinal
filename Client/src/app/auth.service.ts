// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(email: string = '', password: string = '') {
    const userInfo = { email: email, password: password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(
      'http://localhost:3001/api/auth/login',
      JSON.stringify(userInfo),
      {
        headers: headers,
        responseType: 'text',
      }
    );
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(
      'http://localhost:3001/api/auth/signup',
      JSON.stringify(userInfo),
      {
        headers: headers,
        responseType: 'text',
      }
    );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('name');
    localStorage.removeItem('role_id');
    localStorage.removeItem('user_id');
  }

  public isLogin() {
    const str = localStorage.getItem('expires_at') || '';
    if (str == '') return false; // chưa đăng nhập
    const expiresAt = JSON.parse(str);
    return moment().isBefore(moment(expiresAt));
  }
}
