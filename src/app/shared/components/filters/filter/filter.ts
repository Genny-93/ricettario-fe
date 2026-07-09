import { HttpParams } from '@angular/common/http';
import { Component, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { CategoriaService } from '../../../services/categoria';
import { CategoriaOutputDto } from '../../../models/categoria-output-dto';
import { MatIcon } from '@angular/material/icon';
import { Recipe } from '../../../../features/recipes/services/recipe';
import { RecipeCardModel } from '../../../models/recipe-card';

@Component({
  selector: 'app-filter',
  imports: [MatChipsModule, MatSliderModule, MatFormFieldModule, MatSelectModule, FormsModule, MatButtonToggleModule, MatSlideToggleModule, MatIcon],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter implements OnInit {

  constructor(private categoryService: CategoriaService, private recipeService: Recipe) { }

  categories: CategoriaOutputDto[] = [];
  filtroTempoAttivo: boolean = false;

  readonly TEMPO_MAX_SLIDER = 300;

  ricetteFiltrate = output<RecipeCardModel[]>();

  // Tutti i parametri opzionali partono come null
  username: string | null = null;
  category: string | null = null;
  minTempoDiCottura: number | null = null;
  maxTempoDiCottura: number | null = null;
  difficolta: string | null = null;
  valutazioneMedia: number | null = null;
  order: boolean = false;

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err.error);
      }
    });

  }


  // quando l'utente attiva/disattiva il toggle
  onToggleTempo(attivo: boolean): void {
    this.filtroTempoAttivo = attivo;

    if (attivo) {
      // valori di default quando si attiva lo slider
      this.minTempoDiCottura = 0;
      this.maxTempoDiCottura = this.TEMPO_MAX_SLIDER;
    } else {
      // torna a null quando si disattiva
      this.minTempoDiCottura = null;
      this.maxTempoDiCottura = null;
    }
  }


  applicaFiltri(): void {

    console.log(this.username,
      this.category,
      this.minTempoDiCottura,
      this.maxTempoDiCottura,
      this.difficolta,
      this.valutazioneMedia,
      this.order);

    this.recipeService.getRecipesByFilters(this.username, this.category, this.minTempoDiCottura, this.maxTempoDiCottura, this.difficolta, this.valutazioneMedia, this.order).subscribe({
      next: (data) => {
        this.ricetteFiltrate.emit(data);
        console.log(data);
      },
      error: (err) => {
        console.log(err.error)
      }
    });

  }

  resetFiltri(): void {
    this.username = null;
    this.category = null;
    this.minTempoDiCottura = null;
    this.maxTempoDiCottura = null;
    this.difficolta = null;
    this.valutazioneMedia = null;
    this.order = false;
    this.filtroTempoAttivo = false;
    this.applicaFiltri();
  }
}
