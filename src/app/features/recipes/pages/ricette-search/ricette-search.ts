import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../services/recipe';
import { RecipeCardModel } from '../../../../shared/models/recipe-card';
import { ActivatedRoute, Router } from '@angular/router';
import { RicetteCategoriaCard } from '../../../../shared/components/cards/ricette-per-categoria-card/ricette-per-categoria-card';
import { Authentication } from '../../../../core/auth/services/authentication';
import { Filter } from '../../../../shared/components/filters/filter/filter';

@Component({
  selector: 'app-ricette-search',
  imports: [RicetteCategoriaCard, Filter],
  templateUrl: './ricette-search.html',
  styleUrl: './ricette-search.css',
})
export class RicetteSearch implements OnInit {

  title: string = '';
  userId: string = "";
  recipesList: RecipeCardModel[] = [];
  favoriteRecipes: RecipeCardModel[] = [];

  constructor(private recipeService: Recipe, private activatedRoute: ActivatedRoute, private route: Router, private authService: Authentication) { }


  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      const categoria = queryParams.get('categoryName');
      const authorId = queryParams.get('authorId');
      const favorites = queryParams.get('favorites');
      this.valorizzaTitle(categoria, authorId, favorites);
      const filtri = {
        categoryName: categoria,
        authorId: authorId,
        favorites: favorites
      };
      this.recipeService.searchRecipes(filtri).subscribe({
        next: (data) => {
          this.recipesList = data;
        },
        error: (err) => {
          console.log(err);
        }
      })

    });

  }

  onRecipeFilter(recipes: RecipeCardModel[]): void {
    this.recipesList = recipes;
    this.title = 'Ricette filtrate';

  }

  valorizzaTitle(categoryName?: string | null, authorId?: string | null, favorites?: string | null): void {
    if (categoryName) {
      this.title = categoryName;
    } else if (authorId) {
      this.title = `Le mie Ricette`; // Oppure "Ricette dell'utente"
    } else if (favorites) { this.title = 'La mia lista delle Ricette Preferite' }
    else {
      this.title = 'Tutte le Ricette'; // Titolo di fallback se non ci sono parametri
    }
  }



  goToRecipe(id: number): void {
    this.route.navigateByUrl(`/recipe/${id}`)
  }
}
