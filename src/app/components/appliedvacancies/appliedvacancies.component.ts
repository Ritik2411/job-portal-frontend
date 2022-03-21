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
  removed:boolean = false
  copyData:any
  page:number = 1
  totalRecords:string

  constructor(private http:HttpClient, private route:ActivatedRoute) { }
  
  deleteReq(id:number){
    this.http.delete(`http://localhost:5500/VacancyRequests/${id}`).subscribe(res=>{
        if(res){
          window.location.reload()
        }
    })
  }

  status(event){
    if(event.target.value === 'all'){
      this.copyData = this.vacancyDetail
    }

    if(event.target.value === 'approved'){
      let newData = this.vacancyDetail.filter(data => data.approved === true && data.awating_approval === false)
      this.copyData = newData
    }
    
    if(event.target.value === 'rejected'){
      let newData = this.vacancyDetail.filter(data => data.approved === false && data.awating_approval === false)
      this.copyData = newData
    }

    if(event.target.value === 'awaiting_approval'){
      let newData = this.vacancyDetail.filter(data => data.awating_approval === true)
      this.copyData = newData
    }
  }
  
  ngOnInit(): void {
    this.http.get(`http://localhost:5500/VacancyRequests/${this.route.snapshot.paramMap.get('id')}`).subscribe((res) => {
        this.vacancyReq = res
        if(this.vacancyReq.length > 0){
          for(let i=0; i<this.vacancyReq.length; i++){
            this.http.get(`http://localhost:5500/VacancyDetail/vacancy/${parseInt(this.vacancyReq[i].vacancy_id)}`).subscribe((res) => {          
                if(res){
                  this.vacancyDetail.push({
                    id: this.vacancyReq[i].id,
                    published_by: (res[0]?.publishedBy === undefined)?null:res[0]?.publishedBy,
                    applied_on: new Date(this.vacancyReq[i].applied_on).toLocaleString(),
                    description: (res[0]?.job_Description === undefined)?null:res[0]?.job_Description,
                    awating_approval: this.vacancyReq[i].awaiting_approval,
                    approved: this.vacancyReq[i].approved
                  })
                }
            })
          }

          this.load = false
          this.totalRecords = this.vacancyDetail.length
          this.copyData = this.vacancyDetail
        }
         
        else{
          this.load = false
        }
    })
  }
}
