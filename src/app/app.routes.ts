import { Routes } from '@angular/router';
import { Login } from './form-login/form-login';
import { Homepage } from './homepage/homepage';
import { RecipeCard } from './recipe-card/recipe-card';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },

    { path: 'home', component: Homepage },

    { path: 'card', component: RecipeCard }

];
