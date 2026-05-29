import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Authentication } from './services/auth/authentication';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ricettario-fe');

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
