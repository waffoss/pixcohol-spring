import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts/posts.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers: [PostsService]
})
export class FavoritesComponent implements OnInit {

  posts: Object[] = [];


  constructor(private postsService: PostsService) { }


  ngOnInit() {
    this.loadPosts();
  }

  remove(id) {
    this.postsService.addToFavorites(id).subscribe(user => {
      let res: any = user;
      if (res.success) {
        this.loadPosts();
      }
    });
  }

  loadPosts() {
    this.postsService.getFavorites().subscribe(posts => {
      let res: any = posts;
      console.log(res);
      if (res.success) {
        this.posts = res.postResponses;
      }
    });
  }

}
