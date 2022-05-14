import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



import { BlogPages } from './blog-pages/blog-pages.component';
import { BlogRoutes } from './blog.routing';
import { BasicComponent } from './home-page/home-page.component';

@NgModule({
  imports: [CommonModule,RouterModule.forChild(BlogRoutes)],
  declarations: [BasicComponent,BlogPages]
})
export class BlogModule {}
