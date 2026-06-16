import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequestModel } from '../../../../core/auth/models/register-request';
import { Authentication } from '../../../../core/auth/services/authentication';
import { UserOutputDto } from '../../../../core/auth/models/user-output-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {


  registrationSuccessful: boolean = false;
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: Authentication, private router: Router) { }


  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/)]]
    });
  }


  inviaForm(): void {

    //pratica di sicurezza e stabilità nota come Difesa in Profondità
    if (this.signUpForm.invalid) {
      return;
    }

    const registerRequest: RegisterRequestModel = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };

    this.authService.register(registerRequest).subscribe({
      next: (datiUtente: UserOutputDto) => {
        this.registrationSuccessful = true;
        console.log(datiUtente);
        alert("Registrazione avvenuta con successo");
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err.error);
      }
    });

  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get username() {
    return this.signUpForm.get('username');
  }

}
