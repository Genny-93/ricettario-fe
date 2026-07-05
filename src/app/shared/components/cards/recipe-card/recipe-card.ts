import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RecipeCardModel } from '../../../models/recipe-card';
import { Recipe } from '../../../../features/recipes/services/recipe';
import { Authentication } from '../../../../core/auth/services/authentication';

@Component({
  selector: 'app-recipe-card',
  imports: [MatIcon],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {

  @Input() recipe?: RecipeCardModel;


  constructor(private recipeService: Recipe, private authService: Authentication) { }

  addFavorite(idRicetta?: number) {
    const username = this.authService.currentUser();

    if (!username || !idRicetta) {
      console.warn("Impossibile aggiungere ai preferiti: Dati mancanti", { username, idRicetta });
      return;
    }

    this.recipeService.addFavoriteRecipes(username, idRicetta).subscribe({
      next: (valBooleano) => {
        alert("Ricetta aggiunta ai preferiti");
        if (this.recipe) {
          this.recipe.isFavorite = true;
        }
      },
      error: (err) => {
        console.log(err.error);
      }
    });

  }

  deleteFavorite(idRicetta?: number) {
    const username = this.authService.currentUser();
    if (!username || !idRicetta) {
      console.warn("Impossibile aggiungere ai preferiti: Dati mancanti", { username, idRicetta });
      return;
    }

    this.recipeService.deleteFavoriteRecipe(username, idRicetta).subscribe({
      next: (valBooleano) => {
        alert("Ricetta eliminata dai preferiti");
        if (this.recipe) {
          this.recipe.isFavorite = false;
        }
      },
      error: (err) => {
        console.log(err.error);

      }
    });


  }

}
