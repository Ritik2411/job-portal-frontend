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

  constructor(private http:HttpClient, private route:Router){}

  updateVacancy(data:any,id:number){
    this.http.put(`http://localhost:5500/VacancyDetail/${id}`, {
      experience: data.experience,
      job_Description: data.job_Description,
      max_Salary: data.max_Salary,
      min_Salary: data.min_Salary,
      minimum_qualification: data.minimum_qualification,
      no_of_Vacancies: data.no_of_Vacancies
    }).subscribe(res => {
        if(res){
          alert("Vacancy Updated Successfully")
          this.route.navigate(['/vacancies', localStorage.getItem("UserId")])
        }
    })
  }

  ngOnInit(): void {
    this.data = (history.state)
    console.log(this.data)
  }
}
