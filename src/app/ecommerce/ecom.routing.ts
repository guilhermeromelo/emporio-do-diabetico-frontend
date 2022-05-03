import { Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { OrderComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';

export const EcomRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'carrinho',
        component: CartComponent,
        data: {
          title: 'Cart',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Cart' }]
        }
      },
      {
        path: 'finalizar-compra',
        component: CheckoutComponent,
        data: {
          title: 'Checkout',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Checkout' }
          ]
        }
      },
      {
        path: 'detalhes-produto/:id',
        component: DetailsComponent,
        data: {
          title: 'Product Details',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Product Details' }
          ]
        }
      },
      {
        path: 'editar-produto',
        component: EditComponent,
        data: {
          title: 'Edit Product',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Edit Product' }
          ]
        }
      },
      {
        path: 'pedidos',
        component: OrderComponent,
        data: {
          title: 'Orders',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Orders' }]
        }
      },
      {
        path: 'produtos',
        component: ProductComponent,
        data: {
          title: 'Products',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Products' }
          ]
        }
      }
    ]
  }
];
