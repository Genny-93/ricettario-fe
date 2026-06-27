import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RecipeCardModel } from '../../../models/recipe-card';


@Component({
  selector: 'app-ricette-categoria-card',
  imports: [MatIcon],
  templateUrl: './ricette-per-categoria-card.html',
  styleUrl: './ricette-per-categoria-card.css',
})
export class RicetteCategoriaCard {


  //TODO da cambiare il tipo di variabile input
  @Input() recipe?: RecipeCardModel;

  @Input() title? : string;

}
