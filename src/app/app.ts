import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { MatSidenavContent, MatSidenavModule } from "@angular/material/sidenav";
import { Sidenav } from "./shared/components/sidenav/sidenav";
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MatSidenavModule, MatSidenavContent, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ricettario-fe');

  constructor(public router: Router) { }



}
