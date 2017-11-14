import { Component } from '@angular/core';
import {LoadingController,AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import{storage}from 'firebase';
import{Camera,CameraOptions}from'@ionic-native/camera';
import{AngularFireDatabase}from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Dish } from '../../models/dish';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-add-new-dish',
  templateUrl: 'add-new-dish.html',
})
export class AddNewDishPage {
  types: string = "non";
  shops:Observable<any>;;
  cshop :string ="non";
dish={} as Dish;
  //thisdish :Dish ;

shoppath :any ;
dishpath :any;
testCheckboxOpen = false;
testCheckboxResult: any;
  constructor(public db: AngularFireDatabase,
    public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
      private cam:Camera,
    public navCtrl: NavController,
     public navParams: NavParams) {
  this.shoppath = db.database.ref('shops');
  this.dishpath = db.database.ref('dishes');
  var selected = [];
  //$('#checkboxes input:checked').each(function() {
   //   selected.push($(this).attr('name'));
  //});
  this.shops=this.db.list('shops').valueChanges();

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
    message: "Enter a name ",
    inputs: [
      {
        name: 'name',
        placeholder: 'shop name'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          prompt.dismiss();
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log('Saved clicked');
          const id= this.dishpath.push().getKey();   //get id then add name loc and .. in saide the id s
          this.shoppath.child(id).child('name').set(data.name);
          this.shoppath.child(id).child('id').set(id);
          this.dish.shop=id;
        }
      }
    ]
  });
  prompt.present();


}
submit(dish:Dish){
  if(dish.name==null && dish.price==0){
    this.Loading('you must add name and price');
    return;
  }
  else{
//this.thisdish.name=;
this.dishpath.push(dish).then((success)=>{this.Loading('added');
//or add othe +cancel
this.back();
},(Error)=>{
  this.Loading('error');

});
  }
}
Loading(message) {
  const loading = this.loadingCtrl.create({
    duration: 500
  });
  loading.onDidDismiss(() => {
    const alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  });

  loading.present();
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
    value: 'meeting',
    checked: true
  });

  alert.addInput({
    type: 'checkbox',
    label: 'party',
    value: 'party'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'office',
    value: 'office'
  });


  alert.addButton('Cancel');
  alert.addButton({
    text: 'Okay',
    handler: (data: any) => {
      ///what is this data
      this.dish.occasion= data;
    }
  });

  alert.present();
}
}

