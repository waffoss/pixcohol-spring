import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as staticData from '../../../static';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  tagCreate(name) {
    return this.http.post(`${staticData.default.api}/api/tag/create`, { name }, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
  }

  getAllUsers() {
    return this.http.get(`${staticData.default.api}/api/admin/users/all`, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
  }

  deleteUser(id) {
    return this.http.post(`${staticData.default.api}/api/admin/user/delete`, { id }, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
  }
}
