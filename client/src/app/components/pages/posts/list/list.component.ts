import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../../../auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [PostsService, AuthService]
})
export class ListComponent implements OnInit {

  posts: Object[] = [];
  isLogged;
  currentPost: any = {};
  userId;
  imageDiamentions: string = '';
  favorites: any[] = [];

  constructor(private postService: PostsService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
    this.postService.getAllPosts()
      .subscribe(data => {
        let res: any = data;
        console.log(res);
        this.posts = res.postResponses;
      })

    if (this.isLogged) {
      this.userId = localStorage.getItem('id');
      this.postService.getFavorites().subscribe(posts => {
        let data: any = posts;
        if (data.success) {
          this.favorites = data.favorites;
        }
      })
    };


  }

  like(id) {
    this.postService.postLike(id).subscribe(data => {
      let res: any = data;
      if (res.success) {

        this.postService.getSinglePost(id)
          .subscribe(post => {
            let res: any = post;
            this.currentPost.likes = res.likes;

          })
  

        if (this.currentPost.likes.includes(Number(localStorage.getItem('id')))) {
          this.currentPost.isLiked = false;
        } else {
          this.currentPost.isLiked = true;
        }
      }
    });
  }

  addToFavorites(post) {

    this.postService.addToFavorites(post.id).subscribe(user => {
      let res: any = user;
      if (res.success) {
        if (this.currentPost.isInFavorites) {
          this.currentPost.isInFavorites = false;
        } else {
          this.currentPost.isInFavorites = true;
        }
      }
    });

  }

  showInfo(modal, e) {
    this.currentPost = e;
    this.postService.getAuthor(this.currentPost.authorId)
      .subscribe(author => {
        let res: any = author;
        this.currentPost.author = res.email;
      })




      this.postService.getSinglePost(e.id)
      .subscribe(post => {
        let res: any = post;
        this.currentPost.likes = res.likes;

      })
 
     
    if (this.currentPost.likes.includes(Number(localStorage.getItem('id')))) {
      this.currentPost.isLiked = true;
    } else {
      this.currentPost.isLiked = false;
    }

    // this.currentPost.isInFavorites = false;
    // for (let fav of this.favorites) {
    //   if (fav.id === this.currentPost.id) {
    //     this.currentPost.isInFavorites = true;
    //     break;
    //   }
    // }


    let image = new Image();
    image.src = `data:image/JPEG;base64,${this.currentPost.data}`;
    this.imageDiamentions = `${image.width}x${image.height}`;


    this.modalService.open(modal, { size: 'lg' })
      .result
      .then((res) => {
      }).catch(err => {
      })


  }


}
