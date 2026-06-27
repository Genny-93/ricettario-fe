import { H } from '@angular/cdk/keycodes';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  private url = "";

  searchRecipes(filters: { categoryName?: string | null, userId?: string | null }): Observable<RecipeCardModel[]> {
    let parametri = new HttpParams();

    if (filters.categoryName) {
      parametri = parametri.set('categoryName', filters.categoryName);
      this.url = "/search-by-category";
    }
    if (filters.userId) {
      parametri = parametri.set('userId', filters.userId);
      this.url="/search-by-user";
    }
    else { }
    console.log(`${this.baseUrl}`);
    return this.http.get<RecipeCardModel[]>(`${this.baseUrl}${this.url}`, { params: parametri, withCredentials: true });
  }

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
