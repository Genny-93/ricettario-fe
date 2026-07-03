import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Authentication } from "../services/authentication";
import { map } from "rxjs";

export const authGuard: CanActivateFn = () => {
    const authService = inject(Authentication);
    const router = inject(Router);


    if (authService.currentUser()) {
        return true;
    }

    return authService.checkSession().pipe(
        map(user => {
            if (user) {
                return true;
            }

            return router.createUrlTree(['/login']);
        })
    );
};