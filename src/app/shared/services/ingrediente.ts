import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IngredienteOutputDto } from '../models/ingrediente-output-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {

  @Injectable()
  private http = inject(HttpClient);

  private baseUrl: string = 'http://localhost:8080/ingredients';


  getIngredients(): Observable<IngredienteOutputDto[]> {
    return this.http.get<IngredienteOutputDto[]>(`${this.baseUrl}`, { withCredentials: true });
  }


}
