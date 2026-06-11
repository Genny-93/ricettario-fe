import { H } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeCardModel } from '../../models/recipe-card';

@Injectable({
  providedIn: 'root',
})
export class Recipe {


  private baseUrl = 'http://localhost:8080/recipes';

  constructor(private http: HttpClient) {

  }

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
