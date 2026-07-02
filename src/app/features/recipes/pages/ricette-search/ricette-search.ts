import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../services/recipe';
import { RecipeCardModel } from '../../../../shared/models/recipe-card';
import { ActivatedRoute, Router } from '@angular/router';
import { RicetteCategoriaCard } from '../../../../shared/components/cards/ricette-per-categoria-card/ricette-per-categoria-card';
import { Authentication } from '../../../../core/auth/services/authentication';

@Component({
  selector: 'app-ricette-search',
  imports: [RicetteCategoriaCard],
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
      const userId = queryParams.get('userId');
      this.valorizzaTitle(categoria, userId);
      const filtri = {
        categoryName: categoria,
        userId: userId
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
    const idUser = this.authService.currentUser()?.id;
    

  }

  /*
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
  });*/

  valorizzaTitle(categoryName?: string | null, userId?: string | null): void {
    if (categoryName) {
      this.title = categoryName;
    } else if (userId) {
      this.title = `Le mie Ricette`; // Oppure "Ricette dell'utente"
    } else {
      this.title = 'Tutte le Ricette'; // Titolo di fallback se non ci sono parametri
    }
  }



  goToRecipe(id: number): void {
    this.route.navigateByUrl(`/recipe/${id}`)
  }
}
