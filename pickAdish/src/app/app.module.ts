import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import{HttpModule}from'@angular/http';

import { ListsPage } from '../pages/lists/lists';
import { ProfilePage } from '../pages/profile/profile';
import { ShopsPage } from '../pages/shops/shops';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import{AngularFireModule}from 'angularfire2';
import{AngularFireAuthModule}from 'angularfire2/auth';
import{AngularFireDatabaseModule}from 'angularfire2/database';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './ap.firebase.config';
import { AuthProvider } from '../providers/auth/auth';
import {DishPageService} from '../providers/dish-page/dish-page.service';
import { Camera } from '@ionic-native/camera';//import in app.module.ts
import { LoginPage } from '../pages/login/login';
//import { Ionic2RatingModule } from 'ionic2-rating';
import {IonRating} from '../components/ion-rating/ion-rating';

@NgModule({
  declarations: [
    MyApp,
    ListsPage,
    ProfilePage,
    HomePage,
    ShopsPage,
    TabsPage,
   LoginPage,
<<<<<<< HEAD
=======
   IonRating
   //RegisterPage,
>>>>>>> 6a9e5d05d8e68ed05f27a8b7a9c34ad9b430c1f0

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,AngularFireDatabaseModule,
   // Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   ListsPage,
    ProfilePage,
    HomePage,
        ShopsPage,
        TabsPage,
LoginPage,

  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider, DishPageService
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],

})
export class AppModule {}
