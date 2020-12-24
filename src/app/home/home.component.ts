import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommentData } from '../models/comment.model';
import { IPost, IPostData } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: IPostData[];
  isCollapsed = true;
  commentsMap = new Map<number, ICommentData[]>();
  constructor(private postService: PostService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(response =>
      this.posts = response.data
    );
  }

  onReadToggle(event, index) {
    if (event.target.innerHTML === 'Read More') {
      document.getElementById(`ellipsis${index}`).style.display = 'none';
      document.getElementById(`bodyEnd${index}`).style.display = 'inline';
      event.target.innerHTML = 'Read Less';
      document.getElementById(`commentBtn${index}`).style.display = 'block';

      this.postService.getComments(this.posts[index].id).subscribe(response => {
        if (response.data.length) {
          this.commentsMap.set(response.data[0].post_id, [...response.data])
          console.log(this.commentsMap.get(response.data[0].post_id)[0].body)
          console.log(this.commentsMap.keys()[0])
        }
      });
    } else {
      document.getElementById(`ellipsis${index}`).style.display = 'inline';
      document.getElementById(`bodyEnd${index}`).style.display = 'none';
      event.target.innerHTML = 'Read More';
      document.getElementById(`commentBtn${index}`).style.display = 'none';
      this.commentsMap.delete(this.posts[index].id);
    }
  }
}
