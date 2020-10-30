import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  createPosts: boolean = true;
  constructor() { }

  createPost(value: boolean){
    this.createPosts = value;
    console.log(this.createPosts);
  }
}
