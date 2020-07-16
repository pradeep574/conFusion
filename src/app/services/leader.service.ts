import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of, observable, Observable } from 'rxjs';
import { delay, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL} from '../shared/baseurl';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  // These are configured to return the direct values
  /* getLeaders() : Leader[] {
    return LEADERS;
  }
  getLeader(id: string): Leader {
    return LEADERS.filter((leader)=> leader.id===id)[0];
  }

  getFeaturedLeader() : Leader{
    return LEADERS.filter((leader)=> leader.featured)[0];
  } */


  // These will return the promises instead of returning the direct values

  /* getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }
  getLeader(id: string): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.id === id)[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  } */

  // We introduce the delay explicitly For the sake of understanding that there will be delay in the Real World Application to fethc the deatils

  /*
  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS), 2000);
    });
  }
  getLeader(id: string): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.id === id)[0]), 2000);
    });
  }
       getFeaturedLeader(): Promise<Leader> {
         return new Promise(resolve => {
           setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]) ,2000);
         }); 
       } 
    */
  //Use of Observables i.e., rxJs. So here we send the using 'of' operator and convert it to promise

  /*   getLeaders(): Promise<Leader[]> {
      return of(LEADERS).pipe(delay(2000)).toPromise();
    }
    getLeader(id: string): Promise<Leader> {
      return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(2000)).toPromise();
    }
  
    getFeaturedLeader(): Promise<Leader> {
      return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)).toPromise();
    } */

  //But when we use HTTP rxjs it fetches data in the form of Observables so the components has to handle the observable so we convert the above promises back to observable
  
    getLeaders(): Observable<Leader[]> {
      //return of(LEADERS).pipe(delay(2000));
      return this.http.get<Leader[]>(baseURL+'leadership');
    }
    getLeader(id: string): Observable<Leader> {
      //return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(2000));
      return this.http.get<Leader>(baseURL+'leadership/'+id);
    }
  
  getFeaturedLeader(): Observable<Leader> {
    //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL+'leadership?featured=true').pipe(map(leadership => leadership[0]));
  }
}
