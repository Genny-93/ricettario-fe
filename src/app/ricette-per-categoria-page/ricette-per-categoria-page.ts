import { Component, OnInit } from '@angular/core';
import { Recipe } from '../services/recipe/recipe';
import { RicetteCategoriaCard } from '../ricette-per-categoria-card/ricette-per-categoria-card';
import { RecipeCardModel } from '../models/recipe-card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ricette-per-categoria-page',
  imports: [RicetteCategoriaCard],
  templateUrl: './ricette-per-categoria-page.html',
  styleUrl: './ricette-per-categoria-page.css',
})
export class RicettePerCategoriaPage implements OnInit {

  categoryName: string = '';
  recipesList: RecipeCardModel[] = [];

  constructor(private recipeService: Recipe, private route: ActivatedRoute) { }




  ngOnInit(): void {

    this.route.params.subscribe(parametro => {
      this.categoryName = parametro['categoryName'];
      console.log(this.categoryName);
      this.recipeService.getRecipesByCategory(this.categoryName).subscribe({
        next: (ricette) => {
          this.recipesList = ricette;
        },
        error: (err) => {
          console.log(err);
        }
      });
    });


  }



}
