import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router:ActivatedRoute, private http:HttpClient, private toast:ToastrService) { 
    
  }

  employeeid:string = this.router.snapshot.paramMap.get("id")

  updateEmployee(data:any){
    console.log(data.noOfEmployees)
    this.http.put(`http://localhost:5500/EmployeeDetail/${this.employeeid}`, {
      organization: data.organization,
      orgnizationType: data.orgnizationType,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      noOfEmployees: data.noOfEmployees,
      startYear: data.startYear,
      about: data.about,
      createdBy: data.createdBy
    }).subscribe(res => {
      if(res){
        window.location.reload()
      }
    })
  }
  
  ngOnInit(): void {
    this.data = (this.userData)
    console.log(this.data)
  }

}
