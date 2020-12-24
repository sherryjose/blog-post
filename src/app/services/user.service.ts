import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApi = `${environment.apiUrl}/users`;
  constructor(private httpClient: HttpClient) { }

  createUser(user) {
    return this.httpClient.post(this.userApi, user);
  }

}
