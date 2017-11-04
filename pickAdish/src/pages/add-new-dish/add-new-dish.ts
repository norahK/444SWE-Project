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
  shops:any;
  cshop :string ="non";
  thisdish :dish;
shoppath :any ;
dishpath :any;
testCheckboxOpen = false;
testCheckboxResult: any;
  constructor(public db: AngularFireDatabase,public alertCtrl: AlertController,private cam:Camera,public navCtrl: NavController, public navParams: NavParams) {
  this.shoppath = db.database.ref('shops');
  this.dishpath = db.database.ref('dishes');
  var selected = [];
  //$('#checkboxes input:checked').each(function() {
   //   selected.push($(this).attr('name'));
  //});
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
        name: 'name',
        placeholder: 'Title'
      },
      {
        name: 'a',
        placeholder: 'Title'
      },{
        name: 'b',
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
          const id= this.dishpath.push();   //get id then add name loc and .. in saide the id s
          this.shoppath.child(id).set({name:data.name});
        }
      }
    ]
  });
  prompt.present();


}
submit(){
//this.thisdish.name=;

this.dishpath.push(this.thisdish);

}
back(){

}
doCheckbox() {
  const alert = this.alertCtrl.create();
  alert.setTitle('Which planets have you visited?');

  alert.addInput({
    type: 'checkbox',
    label: 'Alderaan',
    value: 'value1',
    checked: true
  });

  alert.addInput({
    type: 'checkbox',
    label: 'Bespin',
    value: 'value2'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'Coruscant',
    value: 'value3'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'Endor',
    value: 'value4'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'Hoth',
    value: 'value5'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'Jakku',
    value: 'value6'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'Naboo',
    value: 'value6'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'Takodana',
    value: 'value6'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'Tatooine',
    value: 'value6'
  });

  alert.addButton('Cancel');
  alert.addButton({
    text: 'Okay',
    handler: (data: any) => {
      console.log('Checkbox data:', data);
      this.testCheckboxOpen = false;
      this.testCheckboxResult = data;
    }
  });

  alert.present();
}
}

