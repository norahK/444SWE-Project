import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewDishPage } from './add-new-dish';

@NgModule({
  declarations: [
    AddNewDishPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewDishPage),
  ],
})
export class AddNewDishPageModule {}
