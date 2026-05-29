import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/login-request';

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

}
