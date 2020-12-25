import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApi = `${environment.apiUrl}/users`;
  constructor(private httpClient: HttpClient) { }

  getUserDetails(userId): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.userApi}/${userId}`);
  }

  createUser(user): Observable<any> {
    return this.httpClient.post<any>(this.userApi, user, { headers: new HttpHeaders().set('Authorization', 'Bearer <Use Private Acces Token>') });
  }

}
