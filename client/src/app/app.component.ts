import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent {

  constructor(private auth: AuthService) { }

  isLogged: boolean;

  get isLoggedIn() {
    return this.auth.isLogged();
  }

}
