import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EcomRoutes } from './ecom.routing';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { OrderComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { AppService } from '../app.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EcomRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    CartComponent,
    CheckoutComponent,
    DetailsComponent,
    EditComponent,
    OrderComponent,
    ProductComponent
  ]
})
export class EcomModule {}
