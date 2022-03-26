import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router, private toast:ToastrService) { }

  registerUser(data:any){
    if(data.password !== data.conformPassword){
      this.toast.warning("Password and Confirm Password must be same",null)
    }

    else{
      this.http.post('http://localhost:5500/register', data).subscribe(res=>{
        if(res){
          this.toast.success("Registerd Successfully")
          this.router.navigate(['/login'])
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
