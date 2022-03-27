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
  itemsPerPage:number = 5

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
      this.load = true
      this.vacancyRequests(this.sort_order, this.itemsPerPage, this.page)
    }
    else{
      this.vacancyDetail = []
      this.checkDate = true
      this.sort_order = "ascending"
      this.load = true
      this.vacancyRequests(this.sort_order, this.itemsPerPage, this.page)
    }
  }

  status(event){
    if(event.target.value === 'All'){
      this.load = true
      this.vacancyRequests(this.sort_order, this.itemsPerPage, this.page)
    }
    else{
      this.load = true
      this.page = 1
      this.http.get(`http://localhost:5500/VacancyRequests/${this.route.snapshot.paramMap.get('id')}?status=${event.target.value}&sort_by_date=${this.sort_order}&page_size=${this.itemsPerPage}&page=${this.page}`).subscribe((res) => {
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
  
  ngOnInit(): void {
      this.vacancyRequests(this.sort_order, this.itemsPerPage, this.page)
  }

  pagechange(event){
    this.page = event
    this.load = true
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
