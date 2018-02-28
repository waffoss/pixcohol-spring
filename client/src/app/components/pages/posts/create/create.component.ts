import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [PostsService,AuthService]
})
export class CreateComponent implements OnInit {

  formData: FormData = new FormData();
  selectedTags: String[] = [];
  joinedTags: String[] = [];
  tags: Object[] = [];
  title: string = '';

  constructor(private postsService: PostsService,private auth:AuthService,private router:Router) { }

  ngOnInit() {
    if (!this.auth.isLogged()) {
      this.router.navigate(['/']);
    }


    this.postsService.getTags()
      .subscribe(data => {
        let res: any = data;
        this.tags = res.tags;
      });
  }


  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.formData.append('picture', file, file.name);


    }
  }

  onSubmit() {

    this.formData.append('title', this.title);
    this.formData.append('tags', JSON.stringify(this.selectedTags));

    console.log(this.formData);

    this.postsService.upload(this.formData)
    .subscribe(data =>{
      let res:any = data;
      if(res.success){
        this.router.navigate(['/']);
      }else{
        console.log(res.reason);
      }
    });
  }

  onSelectChange(target) {
    let id = target.value.split(', ')[0];
    let text = target.value.split(', ')[1];

    if (!this.selectedTags.includes(id)) {

      this.selectedTags.push(id);
      this.joinedTags.push(text)
    }

  }

}
