import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeCard } from '../../../../shared/components/cards/recipe-card/recipe-card';
import { RecipeCardModel } from '../../../../shared/models/recipe-card';
import { Recipe } from '../../../recipes/services/recipe';

@Component({
  selector: 'app-homepage',
  imports: [RecipeCard],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  listaRicette: RecipeCardModel[] = [];

  constructor(private recipeService: Recipe,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getRecipes();
  }


  getRecipes(): void {
    
    const filtri = {
      categoryName: null,
      userId: null
    };

    this.recipeService.searchRecipes(filtri).subscribe({
      next: (datiRicevuti) => {
        this.listaRicette = datiRicevuti;
        console.log('Ricette caricate:', datiRicevuti);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToRecipe(id: number): void {
    this.router.navigateByUrl(`/recipe/${id}`);
  }

}
