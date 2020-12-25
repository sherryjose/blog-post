import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
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
  comment = new FormControl('', Validators.required);
  userForm: FormGroup;
  authError: string;

  constructor(private formBuilder: FormBuilder, private cookieservice: CookieService, private postService: PostService, private userService: UserService) { }

  ngOnInit() {
    this.createUserForm();
    this.getPostData();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['Female'],
      status: ['Active']
    })
  }

  getPostData() {
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

  onVerifyUser() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(response => {
        if (response.code === 201 || response.code === 422) {
          this.cookieservice.set('user', JSON.stringify(this.userForm.value));
          this.closeUserModal();
          this.userForm.patchValue({ email: '', name: '' });
          this.authError = '';
        }
        if (response.code === 401) {
          this.authError = response.data.message;
        }
      });
    }
  }

  onSaveComment(index) {
    if (this.comment.valid) {
      const comment = {
        name: JSON.parse(this.cookieservice.get('user')).name,
        email: JSON.parse(this.cookieservice.get('user')).email,
        body: this.comment.value
      };
      this.postService.createComment(this.posts[index].id, comment).subscribe(response => {
        if (response.code === 201) {
          this.commentsMap.set(this.posts[index].id, this.commentsMap.get(this.posts[index].id) ? this.commentsMap.get(this.posts[index].id).concat(response.data) : [response.data]);
          document.getElementById(`commentBox${index}`).style.display = 'none';
          document.getElementById(`saveCommentBtn${index}`).style.display = 'none';
          this.comment.patchValue('');
        }
      })
    }
  }

  openUserModal(index) {
    if (!this.cookieservice.check('user')) {
      this.userForm.patchValue({ email: '', name: '' });
      this.authError = '';
      document.getElementById("backdrop").style.display = "block";
      document.getElementById("userModal").style.display = "block";
      document.getElementById("userModal").classList.add("show");
    } else {
      document.getElementById(`commentBox${index}`).style.display = 'block';
      document.getElementById(`saveCommentBtn${index}`).style.display = 'block';
    }
  }

  closeUserModal() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("userModal").style.display = "none"
    document.getElementById("userModal").classList.remove("show");
  }
}
