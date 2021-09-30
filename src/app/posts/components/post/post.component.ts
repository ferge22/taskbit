import { Component, Input } from '@angular/core';
import { Post } from 'src/app/services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent {
  @Input() post!: Post;
}
