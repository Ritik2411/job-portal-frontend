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
          this.http.get(`http://localhost:5500/getUsersByEmail/${item.email}`).subscribe((res) => {
            this.data = res;
            localStorage.setItem("TKN", this.token.msg)
            localStorage.setItem("Email", this.data.email)
            localStorage.setItem("UserId", this.data.id)
            localStorage.setItem("Role", this.data.role)

            this.userInfo.addUser({
              UserId : localStorage.getItem("UserId"),
              Email: localStorage.getItem("Email"),
              Role: localStorage.getItem("Role")
            })
          })
          this.router.navigate(["/"])
          setTimeout(()=>{
            alert("Successully Logged in")
          },1000)
        }
    })
  }

  ngOnInit(): void {
  }

}
