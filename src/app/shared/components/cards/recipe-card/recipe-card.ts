import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RecipeCardModel } from '../../../models/recipe-card';

@Component({
  selector: 'app-recipe-card',
  imports: [MatIcon],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {

  @Input() recipe?: RecipeCardModel;


}
