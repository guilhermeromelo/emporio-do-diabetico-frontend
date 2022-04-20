import { Routes } from '@angular/router';

import { BasicComponent } from './basic/basic.component';
import { BlogPages } from './blog-pages/blog-pages.component';

export const CardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basiccards',
        component: BasicComponent,
        data: {
          title: 'Basic Cards',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Basic Cards' }
          ]
        }
      },
      {
        path: 'blog',
        component: BlogPages,
        data: {
          title: 'Receitas',
          urls: [
            { title: 'Página Inicial', url: '/' },
            { title: 'Receitas' }
          ]
        },
      }
    ]
  }
];
