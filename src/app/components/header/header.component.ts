import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  title = 'ABC'
  userData:any
  userInfo:any
  load:boolean = true

  constructor(private userService:RolesService, private http:HttpClient, private route:Router) { }
  

  signOut(){
    this.http.get('http://localhost:5500/signOut').subscribe(res => {
      if(res){
        localStorage.clear()
        this.userService.removeUser()
        this.route.navigate(["/"])
      }  
    })
  }

  ngOnInit(): void {
      if(localStorage.getItem("UserId") !== null){
        this.userService.addUser({
          Username: localStorage.getItem("Username"),
          UserId : localStorage.getItem("UserId"),
          Role: localStorage.getItem("Role")
        })
        
        this.userData = (this.userService.getUser())
      }

      setTimeout(()=>{
        this.load = false
      },2000)
  }

  ngDoCheck(): void {
    this.userData = this.userService.getUser()
  }
}
