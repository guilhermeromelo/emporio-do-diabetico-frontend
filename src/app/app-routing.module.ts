
import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/produtos', pathMatch: 'full' },
            { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
            { path: '', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },
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
