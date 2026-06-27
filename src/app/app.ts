import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { MatSidenavContainer, MatSidenavContent, MatSidenavModule } from "@angular/material/sidenav";
import { Sidenav } from "./shared/components/sidenav/sidenav";
import { Footer } from './shared/components/footer/footer';
import { Authentication } from './core/auth/services/authentication';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MatSidenavModule, MatSidenavContent, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ricettario-fe');

  constructor(public router: Router, private authService: Authentication) { }

// Recuperiamo il riferimento al tag di Angular Material direttamente dall'HTML
  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;

  ngOnInit(): void {
    this.authService.checkSession().subscribe();


    //Codice per resettare lo scroll del contenitore di Angular Material
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      
      // 1. Reset standard per sicurezza
      window.scrollTo(0, 0);

      // 2. Forza il reset dello scroll del contenitore di Angular Material
      if (this.sidenavContainer && this.sidenavContainer.scrollable) {
        this.sidenavContainer.scrollable.scrollTo({ top: 0 });
      }

      // 3. Fallback manuale sul tag <main> per essere sicuri al 100%
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.scrollTop = 0;
      }
      
    });
  }



}
