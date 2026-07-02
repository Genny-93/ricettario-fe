import { H } from '@angular/cdk/keycodes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeCardModel } from '../../../shared/models/recipe-card';
import { RecipeModel } from '../../../shared/models/recipe';
import { CategoriaOutputDto } from '../../../shared/models/categoria-output-dto';
import { RicetteCategoriaCard } from '../../../shared/components/cards/ricette-per-categoria-card/ricette-per-categoria-card';
import { Authentication } from '../../../core/auth/services/authentication';

@Injectable({
  providedIn: 'root',
})
export class Recipe {

  //al posto dell'injection tramite costruttore
  private http = inject(HttpClient);
  private authService = inject(Authentication);

  private baseUrl = 'http://localhost:8080/recipes';

  searchRecipes(filters: { categoryName?: string | null, authorId?: string | null, favorites?: string | null }): Observable<RecipeCardModel[]> {
    let parametri = new HttpParams();
    let url = "";
    const idUser = this.authService.currentUser()?.id;

    if (filters.categoryName) {
      parametri = parametri.set('categoryName', filters.categoryName);
      if (idUser) {
        parametri = parametri.set('idUser', idUser);
      }
      url = "/search-by-category";
    }
    else if (filters.authorId) {
      parametri = parametri.set('authorId', filters.authorId);
      url = "/search-by-user";
    }
    else if (filters.favorites === 'true') {
      if (idUser) {
        parametri = parametri.set('idUser', idUser.toString());
      }
      url = "/find-favorite";
    }
    else {
      if (idUser) {
        parametri = parametri.set('idUser', idUser.toString());
      }
      url = "/cards"
    }
    return this.http.get<RecipeCardModel[]>(`${this.baseUrl}${url}`, { params: parametri, withCredentials: true });
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

  addFavoriteRecipes(idUser: number, idRicetta: number): Observable<boolean> {
    const params = new HttpParams()
      .set('idUser', idUser)
      .set('idRicetta', idRicetta);

    return this.http.post<boolean>(`${this.baseUrl}/add-favorite`, null, { params: params, withCredentials: true });
  }


  findFavoriteRecipes(idUser: number): Observable<RecipeCardModel[]> {
    const params = new HttpParams().set('idUser', idUser);

    return this.http.get<RecipeCardModel[]>(`${this.baseUrl}/find-favorite`, { params: params, withCredentials: true });
  }

  deleteFavoriteRecipe(idUser: number, idRicetta: number): Observable<boolean> {
    const params = new HttpParams()
      .set('idUser', idUser)
      .set('idRicetta', idRicetta);

    return this.http.delete<boolean>(`${this.baseUrl}/delete-favorite`, { params: params, withCredentials: true });
  }
}
