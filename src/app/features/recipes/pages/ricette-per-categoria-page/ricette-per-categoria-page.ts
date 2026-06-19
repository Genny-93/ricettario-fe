import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../services/recipe';
import { RecipeCardModel } from '../../../../shared/models/recipe-card';
import { ActivatedRoute, Router } from '@angular/router';
import { RicetteCategoriaCard } from '../../../../shared/components/cards/ricette-per-categoria-card/ricette-per-categoria-card';

@Component({
  selector: 'app-ricette-per-categoria-page',
  imports: [RicetteCategoriaCard],
  templateUrl: './ricette-per-categoria-page.html',
  styleUrl: './ricette-per-categoria-page.css',
})
export class RicettePerCategoriaPage implements OnInit {

  categoryName: string = '';
  recipesList: RecipeCardModel[] = [];

  constructor(private recipeService: Recipe, private activatedRoute: ActivatedRoute, private route: Router) { }




  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametro => {
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


  goToRecipe(id: number): void {
    this.route.navigateByUrl(`/recipe/${id}`)
  }
}
