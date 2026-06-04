import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from "@angular/material/list";
import { MatIcon, MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatButtonModule, MatNavList, MatIcon, MatListModule, MatIconModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  // Canale di uscita per dire al padre di chiudere
  closeClick = output<void>();

  onCloseClick() {
    this.closeClick.emit();
  }
}
