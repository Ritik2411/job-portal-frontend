import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.scss']
})
export class EditVacancyComponent implements OnInit {
  data:any
  last_date:any

  constructor(private http:HttpClient, private route:Router){}

  updateVacancy(data:any,id:number){
    let last_date = new Date(data.last_Date).toISOString()

    this.http.put(`http://localhost:5500/VacancyDetail/${id}`, {
      experience: data.experience,
      job_Description: data.job_Description,
      max_Salary: data.max_Salary,
      min_Salary: data.min_Salary,
      minimum_qualification: data.minimum_qualification,
      no_of_Vacancies: data.no_of_Vacancies,
      last_Date: last_date
    }).subscribe(res => {
        if(res){
          alert("Vacancy Updated Successfully")
          this.route.navigate(['/vacancies', localStorage.getItem("UserId")])
        }
    })
    
  }

  ngOnInit(): void {
    this.data = {
      experience: history.state.experience,
      id: history.state.id,
      job_Description: history.state.job_Description,
      last_Date: history.state.last_Date,
      max_Salary: history.state.max_Salary,
      min_Salary: history.state.min_Salary,
      minimum_qualification: history.state.minimum_qualification,
      no_of_Vacancies: history.state.no_of_Vacancies,
      no_of_applications: history.state.no_of_applications,
      publishedBy: history.state.publishedBy,
      published_Date: new Date(history.state.published_Date).toLocaleDateString(),
      user_id: history.state.user_id
    }

    this.last_date = this.data.last_Date.toString().split("T")
  }
}
