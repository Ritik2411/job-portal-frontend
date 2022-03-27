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
  totalRecords:string
  page:number = 1
  checked:boolean = false
  sortOrder:string = "default"
  checkLastDate:boolean = false
  itemsPerPage:number = 5
  min_salary:string = ''
  max_salaty:string = ''

  constructor(private http:HttpClient, private route:ActivatedRoute) { }
  

  sortByminimum(event){
    this.min_salary = event.target.value
    if(this.min_salary === ""){
      this.load = true
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }

    else if(this.min_salary !== '' && this.max_salaty === ''){
      this.page = 1
      this.load = true
      this.http.get(`http://localhost:5500/VacancyDetail?min_salary=${this.min_salary}&sortOrder=${this.sortOrder}&pageSize=${this.itemsPerPage}&page=${this.page}`).subscribe(res => {
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
  
          this.load = false
        }
        else{
          this.load = false
        }
      })
    }

    else{
      this.page = 1
      this.load = true
      this.http.get(`http://localhost:5500/VacancyDetail?min_salary=${this.min_salary}&max_salary=${this.max_salaty}&sortOrder=${this.sortOrder}&pageSize=${this.itemsPerPage}&page=${this.page}`).subscribe(res => {
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
  
          this.load = false
        }
        else{
          this.load = false
        }
      })
    }
  }

  sortBymaximum(event){
    this.max_salaty = event.target.value
    if(this.max_salaty === ""){
      console.log("IF")
      this.load = true
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }
    else if(this.max_salaty !== "" && this.min_salary === ""){
      this.page = 1
      this.load = true
      this.http.get(`http://localhost:5500/VacancyDetail?max_salary=${this.max_salaty}&sortOrder=${this.sortOrder}&pageSize=${this.itemsPerPage}&page=${this.page}`).subscribe(res => {
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
  
          this.load = false
        }
        else{
          this.load = false
        }
      })
    }

    else{
      this.page = 1
      this.load = true
      this.http.get(`http://localhost:5500/VacancyDetail?min_salary=${this.min_salary}max_salary=${this.max_salaty}&sortOrder=${this.sortOrder}&pageSize=${this.itemsPerPage}&page=${this.page}`).subscribe(res => {
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
  
          this.load = false
        }
        else{
          this.load = false
        }
      })
    }
  }

  check(){
    if(this.checked){
      this.checked = false
      this.sortOrder ="default"
      this.load = true
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }

    else{
      this.checked = true
      this.sortOrder = "ascending_publishDate"
      this.load = true
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }
  }

  sortLastDate(){
    if(this.checkLastDate){
      this.checkLastDate = false
      this.sortOrder = "descending_lastDate"
      this.load = true
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }

    else{
      this.checkLastDate = true
      this.sortOrder = "ascending_lastDate"
      this.load = true
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }
  }

  pageHandler(event){
    this.page = event
    if(this.min_salary === '' && this.max_salaty === ''){
      this.load = true
      this.vacancyDetail(this.sortOrder, this.page, this.itemsPerPage)
    }

    else if(this.min_salary !== '' && this.max_salaty === ''){
      this.load = true
      this.http.get(`http://localhost:5500/VacancyDetail?min_salary=${this.min_salary}&sortOrder=${this.sortOrder}&pageSize=${this.itemsPerPage}&page=${this.page}`).subscribe(res => {
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
  
          this.load = false
        }
        else{
          this.load = false
        }
      })
    }

    else if(this.max_salaty !== '' && this.min_salary === ''){
      console.log(this.min_salary)
      this.load = true
      this.http.get(`http://localhost:5500/VacancyDetail?max_salary=${this.max_salaty}&sortOrder=${this.sortOrder}&pageSize=${this.itemsPerPage}&page=${this.page}`).subscribe(res => {
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
  
          this.load = false
        }
        else{
          this.load = false
        }
      })
    }

    else{
      this.load = true
      this.http.get(`http://localhost:5500/VacancyDetail?min_salary=${this.min_salary}max_salary=${this.max_salaty}&sortOrder=${this.sortOrder}&pageSize=${this.itemsPerPage}&page=${this.page}`).subscribe(res => {
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
  
          this.load = false
        }
        else{
          this.load = false
        }
      })
    }
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

        this.load = false
      }
      else{
        this.load = false
      }
    })
  }
}
