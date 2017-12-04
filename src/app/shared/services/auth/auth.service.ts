import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Userapi } from '../../../user/userapi';
import { UserInfo } from '../../model/user-info';
import { Authproviders } from '../../model/authproviders.enum';

@Injectable()
export class AuthService implements Userapi {
  profileUrl: string;
  baseurl: string;
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    this.user$ = this.afAuth.authState;
    this.baseurl = 'letsplay';
    this.profileUrl = this.baseurl + '/profile'
  }

  login(userInfo: UserInfo) {
    if (userInfo.vendor == Authproviders[Authproviders.EMAILPASSWORD]) {
      return this.afAuth.auth.signInWithEmailAndPassword(userInfo.username, userInfo.password)
    } else if (userInfo.vendor == Authproviders[Authproviders.GOOGLE]) {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then((user) => {
        let uid = this.getCurrentuser().uid;
        console.log(uid, ":", user.additionalUserInfo)
        console.log(user.additionalUserInfo.profile.name)
        console.log(user.additionalUserInfo.profile.email)
        console.log(user.additionalUserInfo.profile.given_name)
        console.log(user.additionalUserInfo.profile.picture)


        this.afDb.list(this.profileUrl).set(uid, 
            {
              'name'  : user.additionalUserInfo.profile.name,
              'email' : user.additionalUserInfo.profile.email,
              'givenName' : user.additionalUserInfo.profile.given_name,
              'picture' : user.additionalUserInfo.profile.picture
           });
      })
    }
    else if (userInfo.vendor === Authproviders[Authproviders.FACEBOOK]) {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
    }
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  getUserProfile(uid): Observable<any> {
    return this.afDb.object(this.profileUrl+'/'+uid).valueChanges();
  }


  getCurrentuser() {
    return this.afAuth.auth.currentUser;
  }

}
