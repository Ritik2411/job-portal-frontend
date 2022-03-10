import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }

  userData:any

  getUser(){
    return this.userData
  }

  addUser(data){
    this.userData = data
    return this.userData
  }

  removeUser(){
    return this.userData = (null)
  }
}
