import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

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

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS),2000);
    }); 
  }
  getLeader(id: string): Promise<Leader> {
    return new Promise(resolve =>{
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.id === id)[0]),2000);
    }); 
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]) ,2000);
    }); 
  }

}
