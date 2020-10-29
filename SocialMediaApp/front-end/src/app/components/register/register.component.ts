import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {User} from '../../Model/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  user: User;
  constructor(private userService: UserService) { }

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
    this.userService.registerUser(this.user).subscribe(response => {
      console.log(response);
    })
  }
}
