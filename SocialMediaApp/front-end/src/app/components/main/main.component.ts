import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private route: Router, public componentService: ComponentService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  logout(){
    console.log("test");
    this.userService.clearAuthData();
    this.route.navigate(['/home']);
  }

  createPost(){
    this.componentService.createPost(true);
  }
}
