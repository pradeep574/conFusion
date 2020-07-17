import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comments';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})

export class DishDetailsComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  errMess : string;
  prev: string;
  next: string;

  comment: Comment;
  commentForm: FormGroup;

  @ViewChild('cform') commentFormDirective;

  formErrors = {
    'author': ' ',
    'comment': ' '
  };

  validateMessages = {
    'author': {
      'required': 'Name is required,',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is Required'
    }
  };

  constructor(private dishService: DishService,
    private location: Location,
    @Inject("BaseURL") private BaseURL,
    private route: ActivatedRoute, private fb: FormBuilder) { this.createForm(); }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); } ,
      errmess => this.errMess = <any>errmess);

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: '',
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges.subscribe(data => this.ValueChanged(data));
    this.ValueChanged();

  }
  ValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = ' ';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validateMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    const date = new Date();
    /* var month = d.toDateString().substring(4, 7);
    const final = (this.commentForm.get('author').value+" "+ month +" "+ d.getDate() + ', ' +d.getFullYear());
    this.commentForm.controls['author'].setValue(final); */
    this.comment.date = date.toISOString();
    this.dish.comments.push(this.commentForm.value);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }


}
