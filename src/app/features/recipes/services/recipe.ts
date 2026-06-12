import { H } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeCardModel } from '../../../shared/models/recipe-card';

@Injectable({
  providedIn: 'root',
})
export class Recipe {

  //al posto dell'injection tramite costruttore
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/recipes';

  getAllRecipes(): Observable<RecipeCardModel[]> {
    return this.http.get<RecipeCardModel[]>(`${this.baseUrl}/cards`, {
      withCredentials: true
    });
  }

  getRecipesByCategory(nameCategory: string): Observable<RecipeCardModel[]> {
    return this.http.get<RecipeCardModel[]>(`${this.baseUrl}/category/${nameCategory}`, {
      withCredentials: true
    });
  }
}
