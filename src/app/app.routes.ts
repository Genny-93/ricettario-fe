import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { RicetteSearch } from './features/recipes/pages/ricette-search/ricette-search';
import { Homepage } from './features/dashboard/pages/homepage/homepage';
import { Register } from './features/auth/pages/register/register';
import { ForgotPassword } from './features/auth/pages/forgot-password/forgot-password';
import { ChangePassword } from './features/auth/pages/change-password/change-password';
import { RecipePage } from './features/recipes/pages/recipe-page/recipe-page';
import { NewRecipe } from './features/recipes/pages/new-recipe/new-recipe';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },

    { path: 'home', component: Homepage, canActivate: [authGuard] },

    { path: 'recipe-search', component: RicetteSearch, canActivate: [authGuard], pathMatch: 'full' },

    { path: 'register', component: Register },

    { path: 'forgot-password', component: ForgotPassword },

    { path: 'reset-password', component: ChangePassword },

    { path: 'recipe/:id', component: RecipePage, canActivate: [authGuard], pathMatch: 'full' },

    { path: 'new-recipe', component: NewRecipe, canActivate: [authGuard], pathMatch: 'full' }

];
