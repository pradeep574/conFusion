import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  //leader: Leader;
  leaders: Leader[];
  
  constructor(private leaderService: LeaderService,@Inject('BaseURL') private BaseURL){ }
  
  ngOnInit(): void {
    //this.leader = this.leaderService.getFeaturedLeader();
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
  }

}
