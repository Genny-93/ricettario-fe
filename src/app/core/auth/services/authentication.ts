import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { RegisterRequestModel } from '../models/register-request';
import { UserOutputDto } from '../models/user-output-dto';
import { ChangePasswordModel } from '../models/change-password-request';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, loginRequest, {
      withCredentials: true,
      responseType: 'text'
    });
  }

  logout(): Observable<String> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {}, {
      withCredentials: true,
      responseType: 'text'
    });

  }

  register(signUp: RegisterRequestModel): Observable<UserOutputDto> {
    return this.http.post<UserOutputDto>(`${this.baseUrl}/users/register`, signUp);
  }

  forgotPassword(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, null, { params: params, responseType: 'text' });
  }

  resetPassword(changePassword: ChangePasswordModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/auth/reset-password`, changePassword);
  }

}
