import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-received',
  templateUrl: './request-received.component.html',
  styleUrls: ['./request-received.component.scss']
})
export class RequestReceivedComponent implements OnInit {
  vacancyData:any = []
  data:any = []
  load:boolean = true
  date:any
  page:number = 1
  totalRecords:string
  sortOrder:string = 'default'
  pageSize:number = 5
  check:boolean = false
  search:string = 'All'

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  dateSearch(data){
    this.date = data.target.value
    let convertedDate = this.date.split("-")
    let searchdate = convertedDate[2] + "-" + convertedDate[1] + "-" + convertedDate[0]
    this.load = true
    this.vacancyRequests(searchdate,this.sortOrder, this.pageSize, 1) 
  }

  clearDate(){
    this.date = null
    let search = "All"
    this.load = true
    this.vacancyRequests(search,this.sortOrder, this.pageSize, this.page) 
  }

  selectStatus(event){
    console.log(event.target.value)
    this.search = event.target.value
    this.load = true
    this.vacancyRequests(this.search,this.sortOrder, this.pageSize, 1) 
  }

  sortByDate(){
    if(this.check){
      this.sortOrder = "default"
      this.check = false
      this.load = true
      this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page)  
    }

    else{
      this.sortOrder = "ascending"
      this.check = true
      this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page)  
    }
  }

  approve(data:any){
    console.log(data)
    const approved = window.confirm("Continue to approve this vacancy?") 
    if(approved){
      this.http.patch(`http://localhost:5500/VacancyRequests/vacancies/${data.id}`, [
        {
          op: 'replace',
          path: 'awaiting_approval',
          value: false
        },

        {
          op: 'replace',
          path: 'approved',
          value: true
        },

        {
          op: 'replace',
          path: 'no_of_Vacancies',
          value: data.no_of_Vacancies - 1
        }
      ]).subscribe(res => {
          if(res){
            this.http.patch(`http://localhost:5500/VacancyDetail/${(data.vacancy_id)}`, [
              {
                op: 'replace',
                path: 'no_of_Vacancies',
                value: data.no_of_Vacancies - 1
              }
            ]).subscribe(res => {
              if(res){
                alert("Approved Successfully")
                window.location.reload()
              }
            })
          }
      })
    }
    else{
      console.log("op c")
    }
  }

  reject(data:any){
    const rejected = window.confirm("Continue to reject this vacancy?") 
    if(rejected){
      this.http.patch(`http://localhost:5500/VacancyRequests/vacancies/${data.id}`, [
        {
          op: 'replace',
          path: 'awaiting_approval',
          value: false
        },

        {
          op: 'replace',
          path: 'approved',
          value: false
        }
      ]).subscribe(res => {
          if(res){
            window.location.reload()
          }
      })
    }
    else{
      console.log("op c")
    }
  }

  ngOnInit(): void {
    this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page)

    setTimeout(()=>{
      console.log(this.vacancyData)
    },2000)
  }

  pageChange(event){
    this.page = event
    this.load = true
    this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page)  
  }

  vacancyRequests(search,sort_order, page_size, page){
    this.http.get(`http://localhost:5500/VacancyRequests/publisher_name/${localStorage.getItem('Username')}?search=${search}&sort_order=${sort_order}&page_size=${page_size}&page=${page}`).subscribe(res => {
      this.data = res
      this.vacancyData = this.data.vacancyRequest
      this.totalRecords = this.data.totalItems     

      if(this.vacancyData.length > 0){
        this.load = false
      }

      else{
        this.load = false
      }
    })
  }
}
