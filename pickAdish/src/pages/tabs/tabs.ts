import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ListsPage } from '../lists/lists';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { ShopsPage } from '../shops/shops';
import{AngularFireAuth}from 'angularfire2/auth';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root =ShopsPage;
  tab3Root = ListsPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
