import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import{storage}from 'firebase';
import{Camera,CameraOptions}from'@ionic-native/camera';
import{AngularFireDatabase}from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { dish } from '../../models/dish';

@IonicPage()
@Component({
  selector: 'page-add-new-dish',
  templateUrl: 'add-new-dish.html',
})
export class AddNewDishPage {
  types: string = "non";
  shops :string ="non";


  constructor(public alertCtrl: AlertController,private cam:Camera,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewDishPage');
  }
async takePhoto(){

  try{
const options: CameraOptions={
  quality:50,
  targetHeight:600,
  targetWidth:600,
  destinationType:this.cam.DestinationType.DATA_URL,
  encodingType:this.cam.EncodingType.JPEG,
  mediaType: this.cam.MediaType.PICTURE,
  correctOrientation:true
}
const result= await this.cam.getPicture(options);
const img=`data:image/jpeg;base64,${result}`;
const pic = storage().ref('dishs/id');
pic.putString(img,'data_url');
}
catch(e){
  console.error(e);
}
}
addShop(){

  let prompt = this.alertCtrl.create({
    title: 'add new shop',
    message: "Enter a name ,...",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
      },
      {
        name: 'title',
        placeholder: 'Title'
      },{
        name: 'title',
        placeholder: 'Title'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log('Saved clicked');
        }
      }
    ]
  });
  prompt.present();
}
submit(){

}
back(){

}
}

