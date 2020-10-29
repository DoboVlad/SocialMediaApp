import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  credentials:{email:string, password: string};
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl(null,Validators.required),
      "password": new FormControl(null,Validators.required)
    })
  }

  submit(){
    this.credentials = {...this.loginForm.value};
    this.userService.logInUser(this.credentials).subscribe(response => {
      console.log(response);
    })
  }
}
