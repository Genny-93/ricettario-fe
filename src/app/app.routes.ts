import { Routes } from '@angular/router';
import { Login } from './form-login/form-login';
import { Homepage } from './homepage/homepage';

export const routes: Routes = [

    { path: '', component: Login },

    { path: 'home', component: Homepage }

];
