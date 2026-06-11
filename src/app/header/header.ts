import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Authentication } from '../services/auth/authentication';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, MatListModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  constructor(private authService: Authentication,
    private router: Router) {
  }

  // Canale di uscita per avvisare il componente padre
  menuClick = output<void>();


  // Funzione chiamata al click del bottone ad hamburger
  onMenuClick() {
    this.menuClick.emit();
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
