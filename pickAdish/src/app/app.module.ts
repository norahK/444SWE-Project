import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import{HttpModule}from'@angular/http';

import {NotificationPage } from '../pages/notification/notification';
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
import {DishPage} from '../pages/dish/dish';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
//import { CommonModule } from '@angular/common';

import{ShopPage}from '../pages/shop/shop';

@NgModule({
  declarations: [
    MyApp,
    NotificationPage,
    ProfilePage,
    HomePage,
    ShopsPage,
    TabsPage,
   LoginPage,
   IonRating,
   DishPage,
   ShopPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,AngularFireDatabaseModule,
    //CommonModule
   // Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationPage,
    ProfilePage,
    HomePage,
        ShopsPage,
        TabsPage,
LoginPage,
DishPage,
ShopPage
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
