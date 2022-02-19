import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  templateUrl: 'details.component.html'
})
export class DetailsComponent {

  constructor(private router: Router){

  }

  goToCartPage(){
    return '/ecom/cart';
  }

}
