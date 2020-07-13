import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  // These are configured to return the direct values
  /* 
  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => promo.id === id)[0];
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promo) => promo.featured)[0];
  } */

  // These will return the promises instead of returning the direct values

  /* getPromotions(): Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }
  
  getPromotion(id: string): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promo) => promo.id === id)[0]);
  }
  
  getFeaturedPromotion(): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promo) => promo.featured)[0]);
  }
   */

  // We introduce the delay explicitly For the sake of understanding that there will be delay in the Real World Application to fethc the deatils


  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => {
      //Set delay of 2 secs
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id: string): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.id === id)[0]), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
  }
}