import { H } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Recipe {


  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {

  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`, {
      withCredentials: true
    });
  }
}
