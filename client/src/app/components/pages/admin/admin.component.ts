import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [AuthService, AdminService]
})
export class AdminComponent implements OnInit {

  tag: string = '';
  message: string = '';
  error: string = '';
  users: Object[] = [];

  constructor(private router: Router, private auth: AuthService, private admin: AdminService) { }

  ngOnInit() {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    this.getUsers();
  }

  onTagSubmit() {
    this.admin.tagCreate(this.tag)
      .subscribe(data => {
        let res: any = data;
        if (res.success === true) {
          this.message = `${this.tag} added successfully`;
        } else {
          this.error = res.reason;
        }
      })
  }

  deleteUser(id) {
    this.admin.deleteUser(id).subscribe(data => {
      let res:any = data;
      if(res.success){
        this.getUsers();
      }else{
        this.error = res.reason;
      }
    })
  }

  getUsers(){
    this.admin.getAllUsers().subscribe(data => {
      let res: any = data;
      
      if (res.success) {
        this.users = res.users;
      } else {
        this.error = res.reason;
      }
    })
  }
}
