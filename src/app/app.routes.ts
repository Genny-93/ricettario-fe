import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { RicettePerCategoriaPage } from './features/recipes/pages/ricette-per-categoria-page/ricette-per-categoria-page';
import { Homepage } from './features/dashboard/pages/homepage/homepage';
import { Register } from './features/auth/pages/register/register';
import { ForgotPassword } from './features/auth/pages/forgot-password/forgot-password';
import { ChangePassword } from './features/auth/pages/change-password/change-password';
import { RecipePage } from './features/recipes/pages/recipe-page/recipe-page';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },

    { path: 'home', component: Homepage },

    { path: 'recipe-by-category/:categoryName', component: RicettePerCategoriaPage, pathMatch: 'full' },

    { path: 'register', component: Register },

    { path: 'forgot-password', component: ForgotPassword },

    { path: 'reset-password', component: ChangePassword },

    { path: 'recipe/:id', component: RecipePage, pathMatch: 'full' }

];
