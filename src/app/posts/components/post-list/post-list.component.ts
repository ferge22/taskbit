import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService, Post } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit, OnDestroy {
  page: number = 1;
  postsLoading = true;
  posts: Post[] = []
  private readonly subscriptions = new Subscription();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // would have used async pipe, but ngx pagination for some reason doesn't work with it
    this.subscriptions.add(
      this.apiService.getPosts().pipe(
        finalize(() => this.postsLoading = false)
      ).subscribe((data: Post[]) => {
        this.posts = data;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
