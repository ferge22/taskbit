import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    PostsComponent,
    PostListComponent,
    PostComponent,
    PostViewComponent,
    PostFormComponent,
    PostNewComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PostsModule { }
