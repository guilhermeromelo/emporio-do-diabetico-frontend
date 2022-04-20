import { Component } from '@angular/core';
@Component({
  templateUrl: 'cart.component.html'
})
export class CartComponent {

  goToCheckoutPage(){
    return '/finalizar-compra';
  }
}
