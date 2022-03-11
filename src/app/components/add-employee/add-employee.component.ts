import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, DoCheck {

  constructor(private http:HttpClient, private router:ActivatedRoute) { }
  
  employeeData:any = []
  updateForm:boolean = false
  loading:boolean = true

  employeeid = this.router.snapshot.paramMap.get('id')

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/EmployeeDetail/${this.employeeid}`,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
         this.employeeData = res 
         
         if(this.employeeData.length > 0){
            this.updateForm = true
            console.log(this.employeeData)
         }
         else{
           this.updateForm = false
         }
    })

    setTimeout(()=>{
      this.loading = false
    },2000)
  }

   ngDoCheck(): void {
    
  }
}