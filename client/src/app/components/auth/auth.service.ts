import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as staticData from '../../static';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: String, password: String): Observable<Object> {
    return this.http.post(`${staticData.default.api}/login`,
      { email: email, password: password },
      { headers: { 'Content-Type': 'application/json' } })

  }

  isLogged() {
    return localStorage.getItem('authToken') ? true : false;
  }

  isAdmin() {
    if (this.isLogged()) {
      if (localStorage.getItem('_a') === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  register(userObj) {
    return this.http.post(`${staticData.default.api}/register`,
      JSON.stringify(userObj),
      { headers: { 'Content-Type': 'application/json' } })
  }

  profile(){
    return this.http.get(`${staticData.default.api}/profile`,
    {headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }})
  }
}
