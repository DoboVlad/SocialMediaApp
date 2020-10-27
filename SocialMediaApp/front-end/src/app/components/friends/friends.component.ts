import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {User} from '../../Model/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  users: User[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<User[]>("https://localhost:5001/user").subscribe(response => {
      this.users = response;
    });
  }

}
