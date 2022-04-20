import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardsRoutes } from './cards.routing';
import { BasicComponent } from './basic/basic.component';
import { BlogPages } from './blog-pages/blog-pages.component';

@NgModule({
  imports: [RouterModule.forChild(CardsRoutes)],
  declarations: [BasicComponent,BlogPages]
})
export class CardsModule {}
