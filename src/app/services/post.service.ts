import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postApi = `${environment.apiUrl}/posts`;

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<IPost> {
    return this.httpClient.get<IPost>(this.postApi);
  }

  getComments(postId): Observable<IComment> {
    return this.httpClient.get<IComment>(`${this.postApi}/${postId}/comments`);
  }

  createComment(postId, comment): Observable<any> {
    return this.httpClient.post<any>(`${this.postApi}/${postId}/comments`, comment, { headers: new HttpHeaders().set('Authorization', 'Bearer <Use Private Acces Token>') });
  }
}
