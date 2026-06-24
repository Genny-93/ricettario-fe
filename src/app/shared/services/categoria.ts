import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaOutputDto } from '../models/categoria-output-dto';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  @Injectable()
  private http = inject(HttpClient);

  private baseUrl: string = 'http://localhost:8080/categories-recipes';

  getAllCategories(): Observable<CategoriaOutputDto[]> {
    return this.http.get<CategoriaOutputDto[]>(`${this.baseUrl}`, { withCredentials: true });
  }

}
