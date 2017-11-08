import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the IonRatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-rating',
  templateUrl: 'ion-rating.html'
})
export class IonRating {

 //text: string;

 @Input() numStars: number = 5;
 @Input() value: number = 3;
 

 stars: String[] = [];

  constructor() {
    //console.log('Hello IonRating Component');
    //this.text = 'Hello World';
  }
 
  ngAfterViewInit(){
    let tmp = this.value;
    for (let i=0; i<this.numStars; i++, tmp--){
     if(tmp >= 1)
     this.stars.push("star");
    }



  }

}
