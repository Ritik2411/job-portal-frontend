import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { format } from 'url';

@Component({
  selector: 'app-updatejobseeker-details',
  templateUrl: './updatejobseeker-details.component.html',
  styleUrls: ['./updatejobseeker-details.component.scss']
})
export class UpdatejobseekerDetailsComponent implements OnInit {
  @ Input() jobseekerData
  data:any

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router, private toast:ToastrService) { }

  id:string = this.route.snapshot.paramMap.get('id')
  load:boolean = true

  updatejobSeeker(data:any){
    
    this.http.put(`http://localhost:5500/JobSeeker/${this.id}`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      total_expericence: data.total_expericence,
      expected_salary: data.expected_salary,
      dob: new Date(data.dob).toISOString()
    }).subscribe(res => {
      if(res){
        this.toast.success("Updated sucessfully")
        setTimeout(() => {
          window.location.reload()
        },1000)
      }
    })
  }
  ngOnInit(): void {
    if(this.jobseekerData.length > 0){
      this.load = false
      console.log(this.jobseekerData)
    }
  }
}
