import { Component, OnInit } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{AngularFireAuth}from 'angularfire2/auth';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { Observable } from 'rxjs/Observable';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrls: ['/app.scss']
})
export class MyApp implements OnInit{
  rootPage:any;//='DishPage';// TabsPage;

  user: Observable<any>;
  dish: Observable<any>;

  constructor(public push:Push, private authr:AngularFireAuth,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl:AlertController) {
  platform.ready().then(() => {
      //Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
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
pushsetup() {
  const options:PushOptions = {
   android:{ },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {}
};

const pushObject:PushObject = this.push.init(options);

pushObject.on('notification').subscribe((notification: any) => {
  if (notification.additionalData.foreground) {
    let youralert = this.alertCtrl.create({
      title: 'New Push notification',
      message: notification.message
    });
    youralert.present();
  }
});

pushObject.on('registration').subscribe((registration: any) => {
   //do whatever you want with the registration ID
});

pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
}

}
