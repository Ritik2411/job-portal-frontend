import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacancyService{

  constructor(private http:HttpClient) { }

  data:any
  
  getVacancies(){
    this.http.get('http://localhost:5500/VacancyDetail').subscribe(res => {
      this.data = res
      return this.data
    })
  }
}
