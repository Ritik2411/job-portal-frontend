import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  @ Input() userData = []
  data:any = {}
  organizationType:string = ''
  noOfEmployees:number = 0

  constructor(private router:ActivatedRoute, private http:HttpClient) { 
    
  }

  employeeid:string = this.router.snapshot.paramMap.get("id")

  updateEmployee(data:any){
    this.organizationType = typeof(data.orgnizationType)

    console.log(this.organizationType, data.orgnizationType)
    this.http.put(`http://localhost:5500/EmployeeDetail/${this.employeeid}`, data).subscribe(res => {
      alert("Details Updated Successfully")
    })
  }
  
  ngOnInit(): void {
    this.data = (this.userData)
    console.log(this.data)
  }

}
