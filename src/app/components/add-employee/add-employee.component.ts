import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private http:HttpClient, private router:ActivatedRoute) { }
  
  employeeData:any = []
  updateForm:boolean = false
  loading:boolean = true

  employeeid = this.router.snapshot.paramMap.get('id')

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/EmployeeDetail/${this.employeeid}`).subscribe(res => {
         this.employeeData = res 
         
         if(this.employeeData.length > 0){
            this.updateForm = true
            this.loading = false
            console.log(this.employeeData)
         }
         else{
           this.updateForm = false
           this.loading = false
         }
    })
  }
}
