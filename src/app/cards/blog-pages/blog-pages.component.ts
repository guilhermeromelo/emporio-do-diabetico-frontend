import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  templateUrl: 'blog-pages.component.html'
})
export class BlogPages {

  constructor(private router: Router){

  }

  goToCartPage(){
    return '/ecom/cart';
  }

}
