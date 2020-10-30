import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  basicUrl = "https://localhost:5001";
  constructor(private http: HttpClient) { }
  user: User;
  registerUser(user: User){
    return this.http.post(this.basicUrl + "/register", user);
    }

  logInUser(credentials:{email:string, password:string}){
      return this.http.post<User>(this.basicUrl + "/login", credentials);
    }

  safeAuthData(user: User){
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  clearAuthData(){
    localStorage.removeItem('user');
  }

  autoAuthUser(){
    const authenticationInfo = this.getAuthData();
    this.user = JSON.parse(authenticationInfo);
  }

  getAuthData(){
    const user = localStorage.getItem("user");
    if(!user){
      return;
    }
    return user;
  }
}
