import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeCard } from '../recipe-card/recipe-card';
import { Recipe } from '../services/recipe/recipe';
import { RecipeCardModel } from '../models/recipe-card';

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

    this.recipeService.getAllRecipes().subscribe({
      next: (datiRicevuti) => {
        this.listaRicette = datiRicevuti;
        console.log('Ricette caricate:', datiRicevuti);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
