import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultImage } from 'src/app/app-constants';
import { AppService } from 'src/app/app.service';
import Post from 'src/app/models/post';
@Component({
  templateUrl: 'blog-pages.component.html'
})
export class BlogPages{

  post: Post = <Post>{};

  constructor(private router: Router){
    if(router.getCurrentNavigation()?.extras.state?.post)
      this.post = router.getCurrentNavigation()?.extras.state?.post;
    else
      router.navigateByUrl('/blog/home')
  }

  goToCartPage(){
    return '/ecom/cart';
  }

    image = defaultImage;
}
