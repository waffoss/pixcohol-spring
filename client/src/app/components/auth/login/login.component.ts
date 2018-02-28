import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  data: any;
  error: String = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.username.length === 0 || this.password.length === 0) {
      this.error = 'Username or Password is empty';
      return;
    }

    // if (!/^[a-zA-Z0-9]*$/g.test(this.username)) {
    //   this.error = 'Username is not valid!';
    //   return;
    // }

    if (!/^[a-zA-Z0-9]*$/g.test(this.password)) {
      this.error = 'Password is not valid!';
      return;
    }


    this.auth.login(this.username, this.password)
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        if (this.data.success === "true") {
          
          localStorage.setItem('authToken', this.data.token);
          localStorage.setItem('username', this.username);

          this.auth.profile()
            .subscribe(res => {
              this.data = res;
              
              if (this.data.success) {
                localStorage.setItem('id', this.data.id);
                localStorage.setItem('_a', this.data._a);
                
              }

              this.router.navigate(['/']);
              return;
            })

        } 
      });

      this.error = 'Wrong username or password!';
      return;

  }

}
