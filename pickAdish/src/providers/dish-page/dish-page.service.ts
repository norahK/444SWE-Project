
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class DishPageService{
	
private dishPageRef = this.db.dishes'dish-page';

	constructor(private db: AngularFireDatabase){}



	getDishPage(){

     return this.dishPageRef;

	}


}