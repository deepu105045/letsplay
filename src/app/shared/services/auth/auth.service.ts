import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Userapi } from '../../../user/userapi';
import { UserInfo } from '../../model/user-info';
import { Authproviders } from '../../model/authproviders.enum';

@Injectable()
export class AuthService implements Userapi {
  user$: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  login(userInfo: UserInfo) {
    if (userInfo.vendor == Authproviders[Authproviders.EMAILPASSWORD]) {
      return this.afAuth.auth.signInWithEmailAndPassword(userInfo.username, userInfo.password)
    } else if (userInfo.vendor == Authproviders[Authproviders.GOOGLE]) {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }
    else if(userInfo.vendor === Authproviders[Authproviders.FACEBOOK]){
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
    }
  }

  logout(): void {
    this.afAuth.auth.signOut().then(user => {
      console.log('AUTH: user logged off ', user);
      this.router.navigate(['/user/logout']);
    })
  }

  getDisplayName(): string{
     this.user$.subscribe(user=>{
      return user.displayName;
    })
    return;
  }
}
