import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishPage } from './dish';
//import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DishPage,
  ],
  imports: [
    IonicPageModule.forChild(DishPage),
   // Ionic2RatingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class DishPageModule {}
