import { Routes } from '@angular/router';

import { BlogPages } from './blog-pages/blog-pages.component';
import { BasicComponent } from './home-page/home-page.component';

export const BlogRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
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
        path: 'page',
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
