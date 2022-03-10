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
          UserId : localStorage.getItem("UserId"),
          Email: localStorage.getItem("Email"),
          Role: localStorage.getItem("Role")
        })
  
        this.userData = (this.userService.getUser())
        console.log(this.userData)
      }
      else{
        console.log(this.userData)
      }
  }

  ngDoCheck(): void {
    this.userData = this.userService.getUser()
  }
}
