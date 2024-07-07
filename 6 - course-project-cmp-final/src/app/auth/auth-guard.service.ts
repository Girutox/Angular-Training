import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.userChanged.pipe(
      take(1),
      map(user => {
        const isAuthenticated = user != null;

        if (isAuthenticated) {
          return true;
        }

        return this.router.createUrlTree(['/auth']);
      }),
      // tap(
      //   isAuthenticated => {
      //     if (!isAuthenticated) {
      //       this.router.navigate(['/auth']);
      //     } 
      //   }
      // )
    );
  }
}