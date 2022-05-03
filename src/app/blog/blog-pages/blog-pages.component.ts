import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { defaultImage } from 'src/app/app-constants';
@Component({
  templateUrl: 'blog-pages.component.html'
})
export class BlogPages {

  constructor(private router: Router){

  }

  goToCartPage(){
    return '/ecom/cart';
  }

    image = defaultImage;
}
