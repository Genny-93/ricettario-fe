import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Authentication } from '../../../../core/auth/services/authentication';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword implements OnInit {


  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: Authentication) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }


  inviaForm() : void {

    //pratica di sicurezza e stabilità nota come Difesa in Profondità
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const email: string = this.forgotPasswordForm.value.email;
    console.log(email);
    this.authService.forgotPassword(email).subscribe({
      next: (stringa) => {
        console.log(stringa);
      },

      error: (err) => {
        console.log(err.error);
      }
    })


  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }
}
