import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobseeker-details',
  templateUrl: './jobseeker-details.component.html',
  styleUrls: ['./jobseeker-details.component.scss']
})
export class JobseekerDetailsComponent implements OnInit {

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  id:string = this.route.snapshot.paramMap.get('id')
  userData:any
  load:boolean = true
  jobseekerDetail:any
  update:boolean = false

  jobSeeker(data:any){
    
    const confirm = window.confirm('Add Details?')
    if(confirm){
      this.http.post('http://localhost:5500/JobSeeker', {
        user_id: localStorage.getItem('UserId'),
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        total_expericence: data.total_expericence,
        expected_salary: data.expected_salary,
        dob: data.dob
    }).subscribe(res => {
          if(res){
            window.location.reload()
          }
      })
    }
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/getUsersById/${this.id}`).subscribe(res => {
        this.userData = res
        if(this.userData !== null){
          this.http.get(`http://localhost:5500/JobSeeker/${this.id}`).subscribe(res => {
              this.jobseekerDetail = res
              if(this.jobseekerDetail.length > 0){
                    this.update = true
                    this.load = false          
              }
              else{
                this.update = false
                this.load = false
              }
          })
        }
    })
  }
}
