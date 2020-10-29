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
    return this.http.post(this.basicUrl + "/login", credentials);
    }
}
