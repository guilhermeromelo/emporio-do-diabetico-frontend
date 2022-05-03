import { Component } from '@angular/core';
import { defaultImage } from 'src/app/app-constants';
@Component({
  templateUrl: 'checkout.component.html'
})
export class CheckoutComponent {
	active = 1;

    image = defaultImage;
}
