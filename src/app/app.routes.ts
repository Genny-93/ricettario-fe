import { Routes } from '@angular/router';
import { Login } from './form-login/form-login';
import { Homepage } from './homepage/homepage';
import { RicettePerCategoriaPage } from './ricette-per-categoria-page/ricette-per-categoria-page';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },

    { path: 'home', component: Homepage },

    { path: 'recipe-by-category/:categoryName', component: RicettePerCategoriaPage, pathMatch:'full' }

];
