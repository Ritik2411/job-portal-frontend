import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appliedvacancies',
  templateUrl: './appliedvacancies.component.html',
  styleUrls: ['./appliedvacancies.component.scss']
})
export class AppliedvacanciesComponent implements OnInit {
  
  data:any
  vacancyReq:any = []
  vacancyDetail:any = []
  load:boolean = true
  removed:boolean = false
  copyData:any
  page:number = 1
  totalRecords:string
  sort_order:string = 'default'
  checkDate:boolean = false
  itemsPerPage:number = 10

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
      this.sort_order = "default"
      this.vacancyRequests(this.sort_order, this.itemsPerPage, this.page)
    }
    else{
      this.vacancyDetail = []
      this.checkDate = true
      this.sort_order = "ascending"
      this.vacancyRequests(this.sort_order, this.itemsPerPage, this.page)
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
      this.vacancyRequests(this.sort_order, this.itemsPerPage, this.page)
  }

  vacancyRequests(sort_order,page_size, page){
    this.http.get(`http://localhost:5500/VacancyRequests/${this.route.snapshot.paramMap.get('id')}?sort_by_date=${sort_order}&page_size=${page_size}&page=${page}`).subscribe((res) => {
      this.data = res
      this.vacancyReq = this.data.vacancyRequest
      this.totalRecords = this.data.totalItems

      if(this.vacancyReq?.length > 0){
        this.load = false
        this.copyData = this.vacancyReq
      }
       
      else{
        this.load = false
      }
    })
  }
}
