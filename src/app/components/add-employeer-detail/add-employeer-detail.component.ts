import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employeer-detail',
  templateUrl: './add-employeer-detail.component.html',
  styleUrls: ['./add-employeer-detail.component.scss']
})
export class AddEmployeerDetailComponent implements OnInit {

  constructor(private router:ActivatedRoute, private http:HttpClient, private toast:ToastrService) { }
  
  employeeData:any

  employeeid:string = this.router.snapshot.paramMap.get("id")

  addEmployee(data:any){
    this.http.post('http://localhost:5500/EmployeeDetail', {
      id: localStorage.getItem('UserId'),
      organization: data.organization,
      organizationType: data.organizationType,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      noOfEmployee: data.noOfEmployee,
      startYear: data.startYear,
      about: data.about,
      createdBy: data.createdBy
    }).subscribe(res => {
      if(res){
        this.toast.success("Data saved successsfully")
        setTimeout(() => {
          window.location.reload()
        },1000)
      }
    })
  }

  ngOnInit(): void {
    
  }
}
