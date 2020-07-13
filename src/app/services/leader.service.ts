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

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }
  getLeader(id: string): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.id === id)[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}
