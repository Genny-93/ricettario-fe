import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../services/recipe';
import { IngredienteService } from '../../../../shared/services/ingrediente';
import { IngredienteOutputDto } from '../../../../shared/models/ingrediente-output-dto';
import { CategoriaOutputDto } from '../../../../shared/models/categoria-output-dto';
import { CategoriaService } from '../../../../shared/services/categoria';
import { RecipeInputDto } from '../../../../shared/models/recipe-input-dto';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-new-recipe',
  imports: [ReactiveFormsModule, FormsModule, MatIcon],
  templateUrl: './new-recipe.html',
  styleUrl: './new-recipe.css',
})
export class NewRecipe implements OnInit {

  constructor(private fb: FormBuilder,
    private recipeService: Recipe,
    private ingredienteService: IngredienteService,
    private categorieService: CategoriaService
  ) { }


  newRecipeForm!: FormGroup;
  //aggiungere CategoriaModel
  listaCategorie: CategoriaOutputDto[] = [];
  //Aggiungere ingredienti model
  ingredienti: IngredienteOutputDto[] = [];


  ngOnInit(): void {
    this.newRecipeForm = this.fb.group({
      titolo: ['', [Validators.required]],
      tempoDiPreparazione: [0, [Validators.required]],
      difficolta: [0.0, [Validators.required, Validators.min(0.1), Validators.max(5.0)]],
      descBreve: ['', [Validators.required, Validators.maxLength(200)]],
      imgPrincipale: ['', [Validators.required]],

      composizioneRicetta: this.fb.array([]),
      categorie: this.fb.array([]),
      fasiPreparazione: this.fb.array([])

    });


    this.aggiungiNuovaSelectIngrediente();
    this.aggiungiNuovaSelectCategoria();
    this.aggiungiNuovaSelectFasiPreparazione();
    this.caricaIngredienti();
    this.caricaCategorie();

  }

  //FASI PREPARAZIONE RICETTA

  get FasiPreparazioneFormArray(): FormArray {
    return this.newRecipeForm.get('fasiPreparazione') as FormArray;
  }

  creaGruppoFasiPreparazione(): FormGroup {
    return this.fb.group({
      testo: ['', [Validators.required]],
      media: ['']
    });
  }

  aggiungiNuovaSelectFasiPreparazione(): void {
    this.FasiPreparazioneFormArray.push(this.creaGruppoFasiPreparazione());
  }

  rimuoviSelectFasiPreparazione(index: number): void {
    this.FasiPreparazioneFormArray.removeAt(index);
  }

  //COMPOSIZIONE RICETTA

  get ingredientiFormArray(): FormArray {
    return this.newRecipeForm.get('composizioneRicetta') as FormArray;
  }

  private caricaIngredienti(): void {
    this.ingredienteService.getIngredients().subscribe({
      next: (data) => {
        this.ingredienti = data.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log(this.ingredienti);
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  creaGruppoIngrediente(): FormGroup {
    return this.fb.group({
      ingredienteNome: ['', [Validators.required]],
      quantita: ['', [Validators.required]],
      unitaDiMisura: ['', [Validators.required]]
    });
  }

  aggiungiNuovaSelectIngrediente(): void {
    this.ingredientiFormArray.push(this.creaGruppoIngrediente());
  }

  rimuoviSelect(index: number): void {
    this.ingredientiFormArray.removeAt(index);
  }

  //CATEGORIE RICETTA

  get categorieFormArray(): FormArray {
    return this.newRecipeForm.get('categorie') as FormArray;
  }

  private caricaCategorie(): void {
    this.categorieService.getAllCategories().subscribe({
      next: (data) => {
        this.listaCategorie = data.sort((a, b) => a.nomeCategoriaRicetta.localeCompare(b.nomeCategoriaRicetta));
        console.log(this.listaCategorie);
      },
      error: (err) => {
        console.log(err.error);
      }
    });

  }

  creaGruppoCategorie(): FormGroup {
    return this.fb.group({
      nomeCategoriaRicetta: ['', [Validators.required]]
    });
  }

  aggiungiNuovaSelectCategoria(): void {
    this.categorieFormArray.push(this.creaGruppoCategorie());
  }

  rimuoviSelectCategoria(index: number): void {
    this.categorieFormArray.removeAt(index);
  }


  inviaForm(): void {
    //pratica di sicurezza e stabilità nota come Difesa in Profondità
    if (this.newRecipeForm.invalid) {
      return;
    }

    const createRecipeRequest: RecipeInputDto = {
      titolo: this.newRecipeForm.value.titolo,
      tempoDiPreparazione: this.newRecipeForm.value.tempoDiPreparazione,
      difficolta: this.newRecipeForm.value.difficolta,
      descBreve: this.newRecipeForm.value.descBreve,
      imgPrincipale: this.newRecipeForm.value.imgPrincipale,
      composizioneRicetta: this.newRecipeForm.value.composizioneRicetta.map((ing: any) => {
        return {
          ingrediente: ing.ingredienteNome,
          quantita: ing.quantita,
          unitaDiMisura: ing.unitaDiMisura
        };
      }),
      categorieRicetta: this.newRecipeForm.value.categorie.map((c: any) => c.nomeCategoriaRicetta),
      procedimento: this.newRecipeForm.value.fasiPreparazione
    };

    console.log(createRecipeRequest);

    this.recipeService.postRecipe(createRecipeRequest).subscribe({
      next: (data) => {
        alert('Ricetta salvata correttamente');
        console.log(data);
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

}
