import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../../../shared/models/login-request';
import { Authentication } from '../../../../core/auth/authentication';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  private sub: Subscription = new Subscription();

  constructor(private authenticationService: Authentication,
              private router: Router
  ) { }


  accedi() {
    console.log("Dati inviati", this.loginRequest.username);
    this.sub = this.authenticationService.login(this.loginRequest).subscribe({
      next: () => {
        console.log('Login completato con successo. Cookie acquisito dal browser.');
        this.router.navigateByUrl(`/home`);
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
