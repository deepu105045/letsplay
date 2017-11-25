import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Userapi } from '../../../user/userapi';
import { UserInfo } from '../../model/user-info';
import { Authproviders } from '../../model/authproviders.enum';

@Injectable()
export class AuthService implements Userapi {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
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

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  getDisplayName(): string{
     this.user$.subscribe(user=>{
      return user.displayName;
    })
    return;
  }

  getCurrentuser(){
    return this.afAuth.auth.currentUser;
  }
  
}
