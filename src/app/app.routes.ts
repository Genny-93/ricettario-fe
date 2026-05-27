import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Homepage } from './homepage/homepage';

export const routes: Routes = [

    { path: '', component: Login },

    { path: 'home', component: Homepage }

];
