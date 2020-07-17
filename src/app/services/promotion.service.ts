import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
//import { PROMOTIONS } from '../shared/promotions';
import { of, observable, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

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

  /*
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
    } */

  //Use of Observables i.e., rxJs. So here we send the using 'of' operator and convert it to promise
  /* 
  getPromotions(): Promise<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000)).toPromise();
  }
  
  getPromotion(id: string): Promise<Promotion> {
    return of(PROMOTIONS.filter((promo) => promo.id === id)[0]).pipe(delay(2000)).toPromise();
  }
  
  getFeaturedPromotion(): Promise<Promotion> {
    return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000)).toPromise();
  } 
  */
  //But when we use HTTP rxjs it fetches data in the form of Observables so the components has to handle the observable so we convert the above promises back to observable
  getPromotions(): Observable<Promotion[]> {
    //return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    //return of(PROMOTIONS.filter((promo) => promo.id === id)[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
