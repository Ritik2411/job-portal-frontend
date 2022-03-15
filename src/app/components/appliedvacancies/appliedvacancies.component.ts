import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appliedvacancies',
  templateUrl: './appliedvacancies.component.html',
  styleUrls: ['./appliedvacancies.component.scss']
})
export class AppliedvacanciesComponent implements OnInit {
  vacancyReq:any = []
  vacancyDetail:any = []
  load:boolean = true

  constructor(private http:HttpClient, private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.http.get(`http://localhost:5500/VacancyRequests/${this.route.snapshot.paramMap.get('id')}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe((res) => {
        this.vacancyReq = res
        if(this.vacancyReq.length > 0){
          for(let i=0; i<this.vacancyReq.length; i++){
            this.http.get(`http://localhost:5500/VacancyDetail/vacancy/${parseInt(this.vacancyReq[i].vacancy_id)}`,{
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('TKN')
              })
            }).subscribe((res) => {          
                if(res){
                  this.vacancyDetail.push({
                    published_by: res[0]?.publishedBy,
                    applied_on: new Date(this.vacancyReq[i].applied_on).toLocaleString(),
                    description: res[0]?.job_Description,
                    awating_approval: this.vacancyReq[i].awaiting_approval,
                    approved: this.vacancyReq[i].approved
                  })
                }
            })
          }
        }
         
        setTimeout(()=>{
          this.load = false
        },2000)
    })
  }
}
