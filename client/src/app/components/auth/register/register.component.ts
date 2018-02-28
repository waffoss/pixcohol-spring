import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  repassword: string = '';

  error: String = '';
  userData: any;

  constructor(private auth: AuthService,private router:Router) { }

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (!this.validateEmail(this.email)) {
      this.error = 'E-mail is invalid!';
      return;
    }

    

    if (this.password.length === 0) {
      this.error = 'Password cannot be empty';
      return;
    }

    if (!/^[a-zA-Z0-9]*$/g.test(this.password)) {
      this.error = 'Password is not valid!';
      return;
    }

    if (!/^[a-zA-Z0-9]*$/g.test(this.repassword)) {
      this.error = 'Re-Password is not valid!';
      return;
    }

    if (this.password !== this.repassword) {
      this.error = 'Passwords do not match!';
      return;
    }

 

    let userObj = {
      email: this.email,
      password: this.password,  
    }

    this.auth.register(userObj)
    .subscribe(res =>{
      this.userData = res;
      console.log(res);
      if(this.userData.success){

        this.auth.login(this.email,this.password)
        .subscribe((res) => {
          this.userData = res;
          if (this.userData.success) {
            // if(this.data.isBanned){
            //   this.error = `${this.data.username} is banned by Admin`;
            //   return;
            // }
            
          
            localStorage.setItem('authToken', this.userData.token);
            localStorage.setItem('username', this.email);
         
            this.auth.profile()
            .subscribe(res => {
              this.userData = res;
              if (this.userData.success) {
                localStorage.setItem('id', this.userData.id);
                localStorage.setItem('_a', this.userData._a);
              }
            })
            this.router.navigate(['/']);
          } else {
            this.error = this.userData.reason;
          }
        });

        // localStorage.setItem('authToken', this.userData.token);
        // localStorage.setItem('username', this.userData.username);
        // localStorage.setItem('id',this.userData.id);
        // this.router.navigate(['/']);
      }else{
        this.error = this.userData.reason;
      }
    })
    
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
