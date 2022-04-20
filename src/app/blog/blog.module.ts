import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



import { BlogPages } from './blog-pages/blog-pages.component';
import { BlogRoutes } from './blog.routing';
import { BasicComponent } from './home-page/home-page.component';

@NgModule({
  imports: [RouterModule.forChild(BlogRoutes)],
  declarations: [BasicComponent,BlogPages]
})
export class BlogModule {}
