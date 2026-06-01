import { Component } from '@angular/core';
import { Authentication } from '../services/auth/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {


  constructor(private authService: Authentication,
    private router: Router
  ) {

  }

  logout() {
    this.authService.logout().subscribe({
      next: (message) => {
        console.log(message);
        this.router.navigateByUrl('');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
