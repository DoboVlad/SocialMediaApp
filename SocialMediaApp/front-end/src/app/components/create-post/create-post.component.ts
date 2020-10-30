import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/Model/User';
import { ComponentService } from 'src/app/services/component.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPost: FormGroup;
  constructor(private componentService: ComponentService, private userService: UserService) { }
  user:User;
  ngOnInit(): void {
    this.createPost = new FormGroup({
      "description": new FormControl(null),
      "photo": new FormControl(null)
    });
    this.user = this.userService.user;
  }

  viewPosts(){
    this.componentService.createPost(false);
  }

  submit(){

  }
}
