import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './posts.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  errorSubs: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.errorSubs = this.postsService.error.subscribe(errorResponse => {
      this.error = errorResponse;  
    })

    this.fetchPosts();
  }

  onCreatePost(post: { title: string; content: string }) {
    this.postsService.savePost(post).subscribe(
      response => {
        this.fetchPosts();
        console.log(response);
        
      }
      // error => {
        
      // }
    )
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService.clearPosts().subscribe(() => {
      this.fetchPosts();
    })
  }

  fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(response => {
      this.isFetching = false;
      this.loadedPosts = response;
    }, error => {
      this.isFetching = false;
      // this.error = error;
    })
  }

  onErrorDismiss() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSubs.unsubscribe();
  }
}
