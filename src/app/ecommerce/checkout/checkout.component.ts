import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultImage } from 'src/app/app-constants';
import { Cart } from 'src/app/cartController/cartModel';
@Component({
  templateUrl: 'checkout.component.html'
})
export class CheckoutComponent implements OnInit{
  cart: Cart = {totalPrice:0, products:[]};

  constructor(private router:Router){
    let cart = router.getCurrentNavigation()?.extras.state?.cart;
    if(cart)
      this.cart = cart;
    else
      this.router.navigateByUrl('/carrinho');
  }

  ngOnInit(): void {
    console.log(this.cart)
  }

    image = defaultImage;
}
