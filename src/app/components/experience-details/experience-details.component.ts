import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router, private toast:ToastrService) { }
  userData:any
  load:boolean = true
  id:string = this.route.snapshot.paramMap.get('id')
  update:boolean = false
  expData:any 

  experience(data:any){
    const confirm = window.confirm('Add Details?')
    
    if(confirm){
      this.http.post('http://localhost:5500/Experience', {
        user_id: localStorage.getItem('UserId'),
        company_name: data.company_name,
        start_year: data.start_year,
        end_year: data.end_year,
        companyUrl: data.companyUrl,
        designation: data.designation,
        jobDescription: data.jobDescription
      }).subscribe(res => {
        if(res){
          window.location.reload()
        }
      },(error) => {
        if(error.status === 500){
          this.toast.info("Enter jobseeker details first")
          this.router.navigate([this.route.snapshot.paramMap.get("id"), "details"])
        }
      })
    }
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/getUsersById/${this.id}`).subscribe(res => {
        this.userData = res
        if(this.userData !== null){
          this.http.get(`http://localhost:5500/Experience/${this.id}`).subscribe(res => {
            this.expData = res
            if(this.expData.length > 0){
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
