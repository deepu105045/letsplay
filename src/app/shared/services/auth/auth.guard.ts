import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService){}
  canActivate():Observable<boolean>{
    return this.authService.user$.map((user)=>{
      if(user && user.uid){
        return true;
      }else{
        return false;
      }
    });
  }
}
