import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostGuard } from '../guards/post.guard';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'new',
    component: PostNewComponent,
  },
  {
    path: ':id',
    component: PostViewComponent,
    canActivate: [PostGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
