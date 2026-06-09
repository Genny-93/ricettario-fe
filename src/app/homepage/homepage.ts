import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeCard } from '../recipe-card/recipe-card';
import { Recipe } from '../services/recipe/recipe';

@Component({
  selector: 'app-homepage',
  imports: [RecipeCard],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {


  constructor(private recipeService: Recipe,
    private router: Router
  ) {
  }


  recipes = [
    { id: 1, title: 'Torta di mele', url: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', time: '75min', rating: 4.5 },
    { id: 2, title: 'Torta di mele 2', url: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', time: '80min', rating: 4 }
  ];

  getRecipes(): Recipe[] {
    this.recipeService.getAllRecipes().subscribe({
      next: (ricetta) => {
        console.log(ricetta);
      },
      error: (err) => {
        console.log(err);
      }
    })
    return [];
  }

}
