import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {User} from '../../Model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  user: User;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
        'Email': new FormControl(null),
        'Password': new FormControl(null),
        'firstName': new FormControl(null),
        'lastName': new FormControl(null)
    });
  }

  submit(){
    this.user= {...this.signUpForm.value};
    this.http.post("https://localhost:5001/register", this.user).subscribe(data => {
      console.log(data);
    })
  }
}
