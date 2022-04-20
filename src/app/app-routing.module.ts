
import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/ecom/products', pathMatch: 'full' },
            { path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },
            { path: 'ecom', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },
        ]
    },
    {
        path: '',
        component: BlankComponent,
        children: [
            {
                path: 'authentication',
                loadChildren:
                    () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/authentication/404'
    }
];
