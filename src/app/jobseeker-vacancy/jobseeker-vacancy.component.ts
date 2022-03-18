import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';

@Component({
  selector: 'app-jobseeker-vacancy',
  templateUrl: './jobseeker-vacancy.component.html',
  styleUrls: ['./jobseeker-vacancy.component.scss']
})
export class JobseekerVacancyComponent implements OnInit {
  
  vacancies:any = []
  load:boolean = true
  vacancyReq:any
  applied:boolean = false
  copyData:any
  
  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  searchMinSalary(event){
    let newData = this.vacancies.filter(data => data.min_Salary.toLowerCase().includes(event.target.value))
    this.copyData = newData
  }

  searchMaxSalary(event){
    let newData = this.vacancies.filter(data => data.max_Salary.toLowerCase().includes(event.target.value))
    this.copyData = newData
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5500/VacancyDetail').subscribe(res => {
      this.vacancies = res

      if(this.vacancies.length > 0){
        this.http.get(`http://localhost:5500/VacancyRequests/${this.route.snapshot.paramMap.get('id')}`).subscribe(res => {
            this.vacancyReq = res
            if(this.vacancyReq.length > 0){
              for(let i=0; i<this.vacancies.length; i++){
                for(let j=0; j<this.vacancyReq.length; j++){
                  if(this.vacancies[i].id === parseInt(this.vacancyReq[j]?.vacancy_id)){
                    this.vacancies[i]['applied'] = true
                  }
                }
              }
            }          
          })

        this.copyData = this.vacancies
        this.load = false
      }
      else{
        this.load = false
      }
    })
  }
}
