import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.scss']
})
export class AddVacancyComponent implements OnInit {

  constructor(private router:ActivatedRoute,private http:HttpClient,private route:Router) { }

  id:string = this.router.snapshot.paramMap.get('id')
  publishedDate:string
  text:String = new Date().toLocaleString()
  ISODate:any = new Date().toISOString().split('T')
  ISOTime:any
  ISOPattern:any

  AddVacancy(data:any){
    if(data.min_Salary > data.max_Salary){
      alert("Minimum salary must be smaller than maximum salary.")
    }
    else if(data.max_Salary < data.min_Salary){
      alert("Maximum salary must be greater than minimum salary.")
    }

    else if(data.max_Salary === data.min_Salary){
      alert("Minimum and maximum salary cannot be same.")
    }

    else{
      this.http.post('http://localhost:5500/VacancyDetail', {
        experience: data.experience,
        job_Description: data.job_Description,
        last_Date: data.last_Date,
        max_Salary: data.max_Salary,
        min_Salary: data.min_Salary,
        minimum_qualification: data.minimum_qualification,
        no_of_Vacancies: data.no_of_Vacancies,
        publishedBy: data.publishedBy,
        published_Date: new Date(data.published_Date).toISOString(),
        user_id: localStorage.getItem('UserId')
      }).subscribe(res => {
          if(res){
            alert("Vacancy posted successfully")
            this.route.navigate(['/vacancies',this.id])
          }
      })
    }
  }

  ngOnInit(): void {
    this.ISOTime = this.ISODate[1].split('.')
    this.ISOPattern = this.ISODate[0]+'T'+this.ISOTime[0]
  }
}
