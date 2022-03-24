import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';

@Component({
  selector: 'app-jobseeker-vacancy',
  templateUrl: './jobseeker-vacancy.component.html',
  styleUrls: ['./jobseeker-vacancy.component.scss']
})
export class JobseekerVacancyComponent implements OnInit{
  
  data:any
  vacancies:any = []
  load:boolean = true
  vacancyReq:any
  applied:boolean = false
  copyData:any
  totalRecords:string
  page:number = 1
  checked:boolean = false
  sortOrder:string
  checkLastDate:boolean = false
  itemsPerPage:number = 5
  vacancyRequest:any

  constructor(private http:HttpClient, private route:ActivatedRoute) { }
  

  sortByminimum(event){
    let newData = this.vacancies.filter(data => data.min_Salary.toLowerCase().includes(event.target.value))
    console.log(newData)
    this.copyData = newData
  }

  sortBymaximum(event){
    let newData = this.vacancies.filter(data => data.max_Salary.toLowerCase().includes(event.target.value))
    console.log(newData)
    this.copyData = newData
  }

  check(){
    if(this.checked){
      this.checked = false
      this.sortOrder ="default"
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }

    else{
      this.checked = true
      this.sortOrder = "ascending_publishDate"
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }
  }

  sortLastDate(){
    if(this.checkLastDate){
      this.checkLastDate = false
      this.sortOrder = "descending_lastDate"
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }

    else{
      this.checkLastDate = true
      this.sortOrder = "ascending_lastDate"
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }
  }

  pageHandler(event){
    this.page = event
    this.load = true
    this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
  }

  ngOnInit(): void {
    this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)

    setTimeout(()=>{
      console.log(this.vacancies)
    },1000)
  }

  vacancyDetail(sortOrder, page, itemsPerPage){
    this.http.get(`http://localhost:5500/VacancyDetail?sortOrder=${sortOrder}&pageSize=${itemsPerPage}&page=${page}`).subscribe(res => {
      this.data = res
      this.vacancies = this.data.vacancyDetail
      this.totalRecords = this.data.totalItems.toString()

      if(this.vacancies.length > 0){
        for(let i=0; i<this.vacancies.length; i++){
          if(this.vacancies[i].no_of_Vacancies === 0){
            this.vacancies[i]["No_more_requests"] = true 
          }
        }

        this.http.get(`http://localhost:5500/VacancyRequests/alluservacancy/${this.route.snapshot.paramMap.get('id')}`).subscribe(res => {
            
            this.vacancyReq = res
            console.log(this.vacancyReq)
            if(this.vacancyReq.length > 0){
              for(let i=0; i<this.vacancies.length; i++){
                for(let j=0; j<this.vacancyReq.length; j++){
                  if(this.vacancies[i].id === parseInt(this.vacancyReq[j]?.vacancy_id)){
                    console.log("asas")
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
