import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Post {
  body: string
  id: number
  title: string
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<Post[]> {
    // added delay to stimulate loading indicator, skipped interceptor implementation since its small task
    return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts/').pipe(delay(600));
  }

  getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  addPost(post: Post) {
    return this.httpClient.post<Post>('https://jsonplaceholder.typicode.com/posts/', post);
  }

  updatePost(id: number, post: Post) {
    return this.httpClient.put<Post>('https://jsonplaceholder.typicode.com/posts/' + id, post);
  }
}
