import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiFrameModule } from './ui-frame/ui-frame.module';

import 'firebase/storage';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/services/auth/auth.service';
import { Userapi } from './user/userapi';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { ConfirmDialogComponent } from './shared/Dialog/confirmDialog/confirm-dialog/confirm-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { AlertDialogComponent } from './shared/Dialog/alert-dialog/alert-dialog.component';

const firebaseConfig = {
    apiKey: 'AIzaSyCme8PujY4uXC78TTSOKEqMZbaDXV-HQsM',
    authDomain: 'prediction-app-c08b5.firebaseapp.com',
    databaseURL: 'https://prediction-app-c08b5.firebaseio.com',
    projectId: 'prediction-app-c08b5',
    storageBucket: 'prediction-app-c08b5.appspot.com',
    messagingSenderId: '774067079761'
  };

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
  ],
  exports: [
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    UiFrameModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppMaterialModule
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [ 
    AngularFireDatabase,
    AuthGuard,
    AuthService,
    { provide: Userapi, useExisting: AuthService }
  ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
