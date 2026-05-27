import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../models/login-request';
import { Authentication } from '../services/auth/authentication';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-login',
  imports: [FormsModule],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})
export class Login implements OnDestroy {

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  private sub: Subscription = new Subscription();

  constructor(private authenticationService: Authentication) { }


  accedi() {
    console.log("Dati inviati", this.loginRequest);
    this.sub = this.authenticationService.login(this.loginRequest).subscribe({
      next: () => {
        console.log('Login completato con successo. Cookie acquisito dal browser.');
      },
      error: (error) => {
        console.error('Errore di connessione al backend', error);
      }
    });

  }


  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
