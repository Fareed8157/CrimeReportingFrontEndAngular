import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router:Router,private userService:UserService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('currentUser')){
        let role1=next.data['role'] as Array<string>;
        console.log(role1)
        let role=next.data['role'] as Array<string>;
        if(role){
          var match=this.userService.roleMatch(role);
          if(match) return true;
          else{
            this.router.navigate(['/pageNotFound']);
            return false;
          }
        }
        else
          return true;

      }
      this.router.navigate(['/signup']);
      return false;
  }
  
}
