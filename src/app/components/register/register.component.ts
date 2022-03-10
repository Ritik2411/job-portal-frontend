import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }

  registerUser(data:any){
    if(data.UserName !== data.email){
      alert("UserName and Email must be same")
    }

    else if(data.password !== data.conformPassword){
      alert("Password and Confirm Password must be same")
    }

    else{
      this.http.post('http://localhost:5500/register', data).subscribe(res=>{
        if(res){
          this.router.navigate(['/login'])
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
