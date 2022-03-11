import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employeer-detail',
  templateUrl: './add-employeer-detail.component.html',
  styleUrls: ['./add-employeer-detail.component.scss']
})
export class AddEmployeerDetailComponent implements OnInit {

  constructor(private router:ActivatedRoute, private http:HttpClient) { }
  
  employeeData:any

  employeeid:string = this.router.snapshot.paramMap.get("id")

  addEmployee(data:any){
    this.http.post('http://localhost:5500/EmployeeDetail', data,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
      if(res){
        window.location.reload()
      }
    })
  }

  ngOnInit(): void {
    
  }
}
