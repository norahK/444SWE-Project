import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeSlideoPage } from './welcome-slideo';


@NgModule({
  declarations: [
    WelcomeSlideoPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeSlideoPage),
  ],
})
export class WelcomeSlideoPageModule {}
