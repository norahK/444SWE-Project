import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
//import { SomeComponentModule } from '../../components/some/some.component.module';

@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        //HeaderComponentModule
    ],
    exports: [
        ProfilePage
    ]
})
export class ProfilePageModule { }
