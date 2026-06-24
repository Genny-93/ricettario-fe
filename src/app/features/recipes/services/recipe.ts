import { H } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeCardModel } from '../../../shared/models/recipe-card';
import { RecipeModel } from '../../../shared/models/recipe';
import { CategoriaOutputDto } from '../../../shared/models/categoria-output-dto';

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
    }
    );
  }

  getRecipesByCategory(nameCategory: string): Observable<RecipeCardModel[]> {
    return this.http.get<RecipeCardModel[]>(`${this.baseUrl}/category/${nameCategory}`, {
      withCredentials: true
    });
  }

  //TODO
  getCategories(): Observable<CategoriaOutputDto[]>{
    return this.http.get<CategoriaOutputDto[]>(`${this.baseUrl}/category`);
  }

  getRecipeById(id: number): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${this.baseUrl}/${id}`,
      { withCredentials: true }
    );
  }

  postRecipe(recipe: any): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(`${this.baseUrl}`, recipe,
      { withCredentials: true }
    );
  }
}
