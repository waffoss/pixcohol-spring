import { Injectable } from '@angular/core';
import * as staticData from '../../../static';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  upload(formData): Observable<Object> {
    let headers = new Headers();

    return this.http.post(`${staticData.default.api}/api/post/create`, formData, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } })

  }

  getTags(): Observable<Object> {
    return this.http.get(`${staticData.default.api}/api/tag/all`);
  }

  getAllPosts(): Observable<Object> {
    return this.http.get(`${staticData.default.api}/api/post/all`);
  }

  postLike(id) {
    return this.http.post(`${staticData.default.api}/api/post/like/`, { id }, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
  }

  getById(id) {
    return this.http.get(`${staticData.default.api}/api/post/getById/${id}`);
  }

  deleteById(id) {
    return this.http.post(`${staticData.default.api}/api/post/delete/`, { id }, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
  }

  addToFavorites(id) {
    return this.http.post(`${staticData.default.api}/api/user/favorites/add`, { id }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
  }

  getFavorites() {
    return this.http.post(`${staticData.default.api}/api/user/favorites`, {}, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
  }

  getAuthor(id){
    return this.http.get(`${staticData.default.api}/api/user/${id}`);
  }

  getSinglePost(id){
    return this.http.get(`${staticData.default.api}/api/post/${id}`);
  }

}
