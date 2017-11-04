import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ListsPage } from '../lists/lists';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { ShopsPage } from '../shops/shops';
import{LoginPage}from '../login/login';
import{AngularFireAuth}from 'angularfire2/auth';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root =ShopsPage;
  tab3Root;
  tab4Root;

  constructor(
    private toast:ToastController,
    private authr:AngularFireAuth,
    public navCtrl: NavController) {
      this.authr.authState.subscribe(logedin => {
        if(!logedin){
          this.tab4Root=LoginPage;
         this.tab3Root = LoginPage;

        }
        else if (logedin.isAnonymous) {
          this.tab4Root=LoginPage;
          this.tab3Root = LoginPage;

       } else {
        this.tab4Root=ProfilePage;
        this.tab3Root = ListsPage;

        }
      });
    }
  }
