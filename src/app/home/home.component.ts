import { Component, OnInit } from '@angular/core';
import { ICommentData } from '../models/comment.model';
import { IPostData } from '../models/post.model';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: IPostData[];
  userMap = new Map<number, string>();
  commentsMap = new Map<number, ICommentData[]>();
  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(response => {
      this.posts = response.data;
      this.posts.forEach(post => {
        this.userService.getUserDetails(post.user_id).subscribe(response => {
          this.userMap.set(response.data.id, response.data.name);
        })
      });
    });
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
