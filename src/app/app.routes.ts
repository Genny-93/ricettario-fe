import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { RicettePerCategoriaPage } from './features/recipes/pages/ricette-per-categoria-page/ricette-per-categoria-page';
import { Homepage } from './features/dashboard/pages/homepage/homepage';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },

    { path: 'home', component: Homepage },

    { path: 'recipe-by-category/:categoryName', component: RicettePerCategoriaPage, pathMatch:'full' }

];
