import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

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

  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  getDish(id: string): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.id === id)[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
