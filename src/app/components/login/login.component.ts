import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data:any = {}
  token:any = {}
  load:boolean = false
  logged:boolean = false

  constructor(private http:HttpClient, private userInfo:RolesService, private router:Router, private toast:ToastrService) { }
  
  login(item:any){
    this.load = true

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

          this.load = false
          this.toast.success('Successfully logged in',null)
          this.router.navigate(["/"], {replaceUrl: true})
        }
    },(error) => {
      if(error.status === 401){
        this.load = false
        this.toast.error('Invalid Credentails', 'Error')
      }
    })
  }

  ngOnInit(): void {
  }
}
