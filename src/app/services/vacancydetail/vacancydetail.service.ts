import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacancydetailService {
  data:any
  vacancies:any
  totalRecords:any
  vacancyReq:any 

  constructor(private http:HttpClient) { }

  vacancyDetail(id,sortOrder, page, itemsPerPage){
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

        this.http.get(`http://localhost:5500/VacancyRequests/alluservacancy/${id}`).subscribe(res => {
            
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
        
        return this.vacancies  
      }
      else{
//        this.load = false
        return  this.vacancies
      }
    })
  }
}
