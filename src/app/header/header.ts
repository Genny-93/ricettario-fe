import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Authentication } from '../services/auth/authentication';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  constructor(private authService: Authentication,
    private router: Router) {
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
