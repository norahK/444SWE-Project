import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{AngularFireAuth}from 'angularfire2/auth';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',  
  templateUrl: 'app.html',
  styleUrls: ['/app.scss']
})
export class MyApp implements OnInit{
  rootPage:any;//='DishPage';// TabsPage;

  user: Observable<any>;
  dish: Observable<any>;
  
  constructor(    private authr:AngularFireAuth,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  platform.ready().then(() => {
      //Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     statusBar.styleDefault();
      splashScreen.hide();
    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if ((!user) || user.isAnonymous) {
        this.rootPage = 'WelcomeSlideoPage';
       unsubscribe();
      } else {
          this.rootPage = TabsPage;
         unsubscribe();
      }
    });
    });
}
ngOnInit() {

//this.user


}
}
