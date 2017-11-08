import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import{storage}from 'firebase';
import{Camera,CameraOptions}from'@ionic-native/camera';
import{AngularFireDatabase}from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Dish } from '../../models/dish';

@IonicPage()
@Component({
  selector: 'page-add-new-dish',
  templateUrl: 'add-new-dish.html',
})
export class AddNewDishPage {
  types: string = "non";
  shops:any;
  cshop :string ="non";
dish={} as Dish;
  //thisdish :Dish ;

shoppath :any ;
dishpath :any;
testCheckboxOpen = false;
testCheckboxResult: any;
  constructor(public db: AngularFireDatabase,
    public alertCtrl: AlertController,
    private cam:Camera,
    public navCtrl: NavController,
     public navParams: NavParams) {
  this.shoppath = db.database.ref('shops');
  this.dishpath = db.database.ref('dishes');
  var selected = [];
  //$('#checkboxes input:checked').each(function() {
   //   selected.push($(this).attr('name'));
  //});
  }

  ionViewDidLoad() {
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
const pic = storage().ref('dish pic');
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
submit(dish:Dish){
//this.thisdish.name=;
this.dishpath.push(dish);
//sucsuss or error loading before toast
//or add othe +cancel
this.back();

}
back(){
  this.navCtrl.pop();
   // window.history.back();

}
doCheckbox() {
  const alert = this.alertCtrl.create();
  alert.setTitle('Which occation is propriat for this dish ');

  alert.addInput({
    type: 'checkbox',
    label: 'meeting',
    value: 'value1',
    checked: true
  });

  alert.addInput({
    type: 'checkbox',
    label: 'party',
    value: 'value2'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'office',
    value: 'value3'
  });


  alert.addButton('Cancel');
  alert.addButton({
    text: 'Okay',
    handler: (data: any) => {
      this.dish.occasion= data;
    }
  });

  alert.present();
}
}

