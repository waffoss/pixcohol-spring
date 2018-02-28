import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UsersService]
})
export class ProfileComponent implements OnInit {

  userId;
  private sub: any;
  user: any;
  myProfile: boolean = false;
  formData: FormData = new FormData();
  about: string = '';
  latestPosts: Object[] = [];

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.usersService.getById(this.userId)
        .subscribe(data => {
          let res: any = data;
          if (res.success) {
            this.user = res;
            if (this.user.id == localStorage.getItem('id')) {
              this.myProfile = true;
            }
          }
        })

      this.usersService.getLatestPosts(this.userId).subscribe(data => {
        let res:any = data;
        console.log(res);
        if(res.success){
          this.latestPosts = res.postResponses;
        }
      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
