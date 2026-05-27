import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  datiUtente = {
    username: '',
    password: ''
  }

  login() {
    console.log("Dati inviati", this.datiUtente);
  }

}
