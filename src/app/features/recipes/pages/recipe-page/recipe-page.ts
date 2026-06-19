import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../services/recipe';
import { RecipeModel } from '../../../../shared/models/recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  imports: [],
  templateUrl: './recipe-page.html',
  styleUrl: './recipe-page.css',
})
export class RecipePage implements OnInit {

  idRicetta: number = 0;
  recipe?: RecipeModel;


  
  constructor(private recipeService: Recipe, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const idDaUrl = param.get('id');

      // Converte in numero, perché idDaUrl è string; se il parametro è null o non valido, assegna 0 (o un valore di default)
      this.idRicetta = idDaUrl ? Number(idDaUrl) : 0;

      this.recipeService.getRecipeById(this.idRicetta).subscribe({

        next: (ricetta) => {
          console.log(ricetta);
          this.recipe = ricetta;
        },

        error: (err) => {
          console.log(err.error);
        }
      });
    });
  }



}
