import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of, observable, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }


  // These are configured to return the direct values
  /* 
   getDishes() : Dish[] {
     return DISHES;
   }
 
   getDish(id: string): Dish {
       return DISHES.filter((dish)=> dish.id===id)[0];
   }
 
   getFeaturedDish():Dish {
     return DISHES.filter((dish)=>dish.featured)[0];
   }
  */

  // These will return the promises instead of returning the direct values
/*
   getDishes(): Promise<Dish[]> {
     return Promise.resolve(DISHES);
   }
 
   getDish(id: string): Promise<Dish> {
     return Promise.resolve(DISHES.filter((dish) => dish.id === id)[0]);
   }
 
   getFeaturedDish(): Promise<Dish> {
     return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
   } 
*/
  // We introduce the delay explicitly For the sake of understanding that there will be delay in the Real World Application to fethc the deatils

  /*    
  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => dish.id === id)[0]), 2000);
    });
  }
  
  getFeaturedDish(): Promise<Dish> {
      return new Promise(resolve => {
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
  }   */


//Use of Observables i.e., rxJs. So here we send the using 'of' operator and convert it to promise
  /* 
  getDishes(): Promise<Dish[]> {
    return of(resolve(DISHES)).pipe(delay(2000)).toPromise();
  }

  getDish(id: string): Promise<Dish> {
    return of(resolve(DISHES.filter((dish) => dish.id === id)[0])).pipe(delay(2000)).toPromise();
  }

  getFeaturedDish(): Promise<Dish> {
    return of(resolve(DISHES.filter((dish) => dish.featured)[0])).pipe(delay(2000)).toPromise();
  }
 */
  //But when we use HTTP rxjs it fetches data in the form of Observables so the components has to handle the observable so we convert the above promises back to observable
    
 getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
  }
  
  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds() : Observable<string[] | any > {
    return of(DISHES.map(dish => dish.id));
  }
}
