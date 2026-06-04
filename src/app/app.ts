import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { MatSidenavContent, MatSidenavModule } from "@angular/material/sidenav";
import { Sidenav } from "./sidenav/sidenav";

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
