import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
/* This is not how to get the details ideally  */
/* import { DISHES } from '../shared/dishes'; */

/* It need to be injected using the services */
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display: block;'
  },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  errMess: string;
  dishes: Dish[];

  //selectedDish: Dish;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes, 
      errmess => this.errMess = <any>errmess);
  }

  /* onSelect(dish: Dish) {
    this.selectedDish = dish;
  } */

}
