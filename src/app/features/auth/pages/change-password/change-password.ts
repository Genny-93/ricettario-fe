import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Authentication } from '../../../../core/auth/services/authentication';
import { ChangePasswordModel } from '../../../../core/auth/models/change-password-request';


// Funzione di validazione personalizzata
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPassword')?.value;
  const confermaPassword = control.get('confermaPassword')?.value;

  // Se i campi sono valorizzati ma diversi, restituisce un errore personalizzato
  return password && confermaPassword && password !== confermaPassword ? { passwordMismatch: true } : null;
};


@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword implements OnInit {

  changePasswordForm!: FormGroup;

  tokenReset: string | null = null;

  isChanged: boolean = false;



  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: Authentication) { }



  ngOnInit(): void {
    this.isChanged = false;
    this.tokenReset = this.route.snapshot.queryParamMap.get('token');
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/)]],
      confermaPassword: ['', [Validators.required]]

    }, { validators: passwordMatchValidator });
  }

  inviaForm(): void {
    //pratica di sicurezza e stabilità nota come Difesa in Profondità
    if (this.changePasswordForm.invalid) {
      return;
    }

    const changePasswordDto: ChangePasswordModel = {
      token: this.tokenReset || '',
      newPassword: this.changePasswordForm.value.newPassword
    }

    console.log('Dati pronti per il server:', changePasswordDto);

    this.authService.resetPassword(changePasswordDto).subscribe({
      next: (dato) => {
        this.isChanged = dato;
      },
      error: (err) => {
        console.log(err.error);
      }

    });

  }


  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }





}
