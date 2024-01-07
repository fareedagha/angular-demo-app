import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { DataService } from "../services/data.service";


@Injectable({
   providedIn: "root",
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService,private dataService: DataService, private router: Router) {}

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.dataService.AuthenticatedUser()) {
        // this.router.navigate(["/home"]);
         return true; 
      } else {
         this.router.navigate(["/login"]);
         return false;
      }
   }
}