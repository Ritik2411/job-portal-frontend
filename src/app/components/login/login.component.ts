import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data:any = {}
  token:any = {}

  constructor(private http:HttpClient, private userInfo:RolesService,private router:Router) { }

  login(item:any){
    this.http.post("http://localhost:5500/login", item).subscribe((result) => {
        if(result !== null){
          this.token = result
          this.http.get(`http://localhost:5500/getUserByUsername/${item.username}`).subscribe((res) => {
            this.data = res;
            localStorage.setItem("TKN", this.token.msg)
            localStorage.setItem("Username", this.data.userName)
            localStorage.setItem("UserId", this.data.id)
            localStorage.setItem("Role", this.data.role)

            this.userInfo.addUser({
              UserId : localStorage.getItem("UserId"),
              Username: localStorage.getItem("Username"),
              Role: localStorage.getItem("Role")
            })
          })
          
          alert("Successully Logged in")
          this.router.navigate(["/"])
        }
    },(error) => {
      if(error.status === 401){
        alert("Invalid login credentials.")
      }
    })
  }

  ngOnInit(): void {
  }

}
