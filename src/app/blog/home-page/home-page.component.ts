import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultImage } from 'src/app/app-constants';
import { AppService } from 'src/app/app.service';
import Post from 'src/app/models/post';

@Component({
  templateUrl: 'home-page.component.html'
})
export class BasicComponent implements OnInit{

  constructor(private router: Router, private service: AppService){

  }

  posts: Post[] = [];

  image = defaultImage;

  async ngOnInit(): Promise<void> {
    this.posts = <Post[]>await this.service.getRequest('/blog-posts');
  }

  goToPost(post: Post){
    this.router.navigateByUrl('/blog/page', {state: {post: post}})
  }
}
