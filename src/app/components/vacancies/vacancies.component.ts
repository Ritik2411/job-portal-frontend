import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  vacancies:any
  load:boolean = true

  constructor(private http:HttpClient, private router:ActivatedRoute) { }

  id = this.router.snapshot.paramMap.get('id')

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/VacancyDetail/${this.id}`,{
      headers:new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
      this.vacancies = res
      if(this.vacancies.length>0){
        this.load = false 
      }
      else{
        this.load = false    
      }
    })
  }

}
