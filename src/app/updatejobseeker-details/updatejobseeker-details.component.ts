import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatejobseeker-details',
  templateUrl: './updatejobseeker-details.component.html',
  styleUrls: ['./updatejobseeker-details.component.scss']
})
export class UpdatejobseekerDetailsComponent implements OnInit {
  @ Input() jobseekerData

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  id:string = this.route.snapshot.paramMap.get('id')
  load:boolean = true

  updatejobSeeker(data:any){
    console.log(data)
    this.http.put(`http://localhost:5500/JobSeeker/${this.id}`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      total_expericence: data.total_expericence,
      expected_salary: data.expected_salary,
      dob: data.dob
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
      if(res){
        alert("Updated Successfully")
        window.location.reload()
      }
    })
  }
  ngOnInit(): void {
    if(this.jobseekerData.length > 0){
      this.load = false
    }
  }
}