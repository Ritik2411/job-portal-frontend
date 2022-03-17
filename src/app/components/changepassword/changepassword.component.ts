import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private http:HttpClient, private route:Router) { }

  changePassword(data:any){
      console.log(data)
      if(data.current_password === data.password){
        alert("New Password cannot be same as old one.")
      }
      else{
        this.http.post('http://localhost:5500/ChangePassword',data).subscribe(res => {
          if(res){
            alert("Password changed successfully")
            this.route.navigate(['/'])
          }
        })
      }
  }

  ngOnInit(): void {
  }

}
