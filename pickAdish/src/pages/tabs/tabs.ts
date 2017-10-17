import { Component } from '@angular/core';

import { ListsPage } from '../lists/lists';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { ShopsPage } from '../shops/shops';


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
