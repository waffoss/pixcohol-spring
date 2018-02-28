import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  isNavbarCollapse: boolean = true;
  username: String;
  userId;
  isAdmin:Boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  @Input() isLoggedIn

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.isLoggedIn) {
      this.username = localStorage.getItem('username');
      this.userId = localStorage.getItem('id');
      this.isAdmin = this.auth.isAdmin();
    } else {
      this.username = undefined;
    }
  }


  toggleCollapse() {
    this.isNavbarCollapse = !this.isNavbarCollapse;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
