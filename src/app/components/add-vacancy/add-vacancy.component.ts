import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.scss']
})
export class AddVacancyComponent implements OnInit {

  constructor(private router:ActivatedRoute,private http:HttpClient,private route:Router, private toast:ToastrService) { }

  id:string = this.router.snapshot.paramMap.get('id')
  text:String = new Date().toLocaleDateString()
  ISODate:any = new Date().toISOString().split('T')
  userName:string = localStorage.getItem('Username')

  AddVacancy(data:any){
    if(data.min_Salary > data.max_Salary){
      this.toast.info("Minimum salary must be smaller than maximum salary.")
    }
    else if(data.max_Salary < data.min_Salary){
      this.toast.info("Maximum salary must be greater than minimum salary.")
    }

    else if(data.max_Salary === data.min_Salary){
      this.toast.info("Minimum and maximum salary cannot be same.")
    }

    else{
      const last_date = new Date(data.last_Date).toLocaleString()

      this.http.post('http://localhost:5500/VacancyDetail', {
        experience: data.experience,
        job_Description: data.job_Description,
        last_Date: last_date,
        max_Salary: data.max_Salary,
        min_Salary: data.min_Salary,
        minimum_qualification: data.minimum_qualification,
        no_of_Vacancies: data.no_of_Vacancies,
        publishedBy: data.publishedBy,
        published_Date: new Date(data.published_Date).toISOString(),
        user_id: localStorage.getItem('UserId')
      }).subscribe(res => {
          if(res){
            this.toast.success("Vacancy posted successfully")
            this.route.navigate(['/vacancies',this.id])
          }
      })
    }
  }

  ngOnInit(): void {
    
  }
}
