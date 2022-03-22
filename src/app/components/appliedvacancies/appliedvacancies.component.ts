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
  sort_order:string = ''
  checkDate:boolean = false

  constructor(private http:HttpClient, private route:ActivatedRoute) { }
  
  deleteReq(id:number){
    this.http.delete(`http://localhost:5500/VacancyRequests/${id}`).subscribe(res=>{
        if(res){
          window.location.reload()
        }
    })
  }

  sortByDate(){
    if(this.checkDate){
      this.checkDate = false
      this.sort_order = ""
      this.vacancyRequests(this.sort_order)
    }
    else{
      this.vacancyDetail = []
      this.checkDate = true
      this.sort_order = "ascending"
      this.vacancyRequests(this.sort_order)
    }
  }

  status(event){
    if(event.target.value === 'all'){
      this.copyData = this.vacancyReq
    }

    if(event.target.value === 'approved'){
      let newData = this.vacancyReq.filter(data => data.approved === true && data.awaiting_approval === false)
      this.copyData = newData
    }
    
    if(event.target.value === 'rejected'){
      let newData = this.vacancyReq.filter(data => data.approved === false && data.awaiting_approval === false)
      this.copyData = newData
    }

    if(event.target.value === 'awaiting_approval'){
      let newData = this.vacancyReq.filter(data => data.awaiting_approval === true)
      this.copyData = newData
    }
  }
  
  ngOnInit(): void {
      this.vacancyRequests(this.sort_order)
  }

  vacancyRequests(sort_order){
    this.http.get(`http://localhost:5500/VacancyRequests/${this.route.snapshot.paramMap.get('id')}?sort_by_date=${sort_order}`).subscribe((res) => {
      this.vacancyReq = res
      if(this.vacancyReq?.length > 0){
        this.load = false
        this.totalRecords = this.vacancyReq.length
        this.copyData = this.vacancyReq
      }
       
      else{
        this.load = false
      }
    })
  }
}
