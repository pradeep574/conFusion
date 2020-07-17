import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
/* This is not how to get the details ideally  */
/* import { DISHES } from '../shared/dishes'; */

/* It need to be injected using the services */
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
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
