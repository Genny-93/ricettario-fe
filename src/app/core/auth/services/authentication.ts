import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { RegisterRequestModel } from '../models/register-request';
import { UserOutputDto } from '../models/user-output-dto';
import { ChangePasswordModel } from '../models/change-password-request';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  public currentUser = signal<UserOutputDto | null>(null);

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, loginRequest, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      switchMap(() => this.checkSession())
    );
  }

  logout(): Observable<String> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {}, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      tap(() => {
        this.currentUser.set(null);
        console.log(this.currentUser());
      })
    );
  }

  checkSession(): Observable<UserOutputDto | null> {
    return this.http.get<UserOutputDto>(`${this.baseUrl}/auth/me`, { withCredentials: true }).pipe(
      // Il server risponde con i dati dell'utente (user).
      // tap "intercetta" l'oggetto user e lo salva nel Signal per aggiornare l'app,
      // dopodiché fa passare l'oggetto user intatto verso l'esterno.
      tap(user => this.currentUser.set(user)),
      // CASO DI ERRORE:
      catchError(() => {
        this.currentUser.set(null); // Azzera la variabile per sicurezza
        // Trasforma l'errore in un flusso sicuro che emette 'null'
        return of(null);
      })
    );
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
