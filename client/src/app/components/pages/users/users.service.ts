import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as staticData from '../../../static';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getById(id): Observable<Object> {
    return this.http.get(`${staticData.default.api}/api/user/${id}`);
  }

  upload(formData): Observable<Object> {
    let headers = new Headers();

    return this.http.post(`${staticData.default.api}/api/user/avatar/change`, formData, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } })
  }

  getLatestPosts(id) {
    return this.http.get(`${staticData.default.api}/api/post/getLatestPosts/${id}`);
  }

}
