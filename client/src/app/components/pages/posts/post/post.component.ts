import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostsService, AuthService]
})
export class PostComponent implements OnInit {

  post: any;
  postId;
  private sub: any;
  myPost: Boolean = false;
  isLogged: Boolean = false;


  constructor(private postService: PostsService, private route: ActivatedRoute, private authService: AuthService,private router:Router) { }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
    this.sub = this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.postService.getSinglePost(this.postId)
        .subscribe(data => {
          let res: any = data;
          if (res.success) {
            console.log(res);
            this.post = res;
            if(this.post.authorId == localStorage.getItem('id')){
              this.myPost=true;
            }

            this.postService.getAuthor(this.post.authorId)
            .subscribe(author => {
              let res: any = author;
              this.post.author = res.email;
            })


            if (this.post.likes.includes(Number(localStorage.getItem('id')))) {
              this.post.isLiked = true;
            } else {
              this.post.isLiked = false;
            }
          }
        })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  like(id) {
    console.log(id);
    this.postService.postLike(id).subscribe(data => {
      let res: any = data;
      if (res.success) {

        this.postService.getSinglePost(id)
          .subscribe(post => {
            let res: any = post;
            this.post.likes = res.likes;

          })
  

        if (this.post.likes.includes(Number(localStorage.getItem('id')))) {
          this.post.isLiked = false;
        } else {
          this.post.isLiked = true;
        }
      }
    });
  }

  delete() {
    this.postService.deleteById(this.post.id)
      .subscribe(data => {
        let res:any = data;
        if(res.success){
          this.router.navigate(['/']);
        }else{
          console.log(res.reason);
        }
      })
  }

}
