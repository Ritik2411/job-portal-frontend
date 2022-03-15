import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  id:string
  userData:any = {}
  load:boolean = true

  constructor(private route:ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.http.get(`http://localhost:5500/getAllUsersById/${this.id}`).subscribe(res => {
      this.userData = res
      if(this.userData.length > 0){
        this.load = false
      }
      else{
        this.load = false
      }
      //console.log(this.userData)
    })
  }
}
