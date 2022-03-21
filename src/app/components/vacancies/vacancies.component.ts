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
  copyData:any
  date:any
  page:number = 1
  totalRecords:string

  constructor(private http:HttpClient, private router:ActivatedRoute) { }

  id = this.router.snapshot.paramMap.get('id')

  searchChange(value){
    let newData = this.vacancies.filter( data => data.publishedBy.toLowerCase().includes(value.toLowerCase()))
    this.copyData = newData
    console.log(this.copyData)
  }  

  searchBydate(event){
    this.date = event.target.value
    let newData = this.vacancies.filter(data => data.published_Date.toLowerCase().includes(this.date.toLowerCase()))
    this.copyData = newData
  }

  clearSearch(){
    this.copyData = this.vacancies
  }

  cleardate(){
    this.date = null
    this.copyData = this.vacancies
  }
  
  changeExp(event){
    let txt = event.target.value
    let newData = this.vacancies.filter(data => data.experience.toLowerCase().includes(txt.toLowerCase()))
    this.copyData = newData
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/VacancyDetail/${this.id}`).subscribe(res => {
      this.vacancies = res
      this.totalRecords = this.vacancies.length
      this.copyData = this.vacancies

      if(this.vacancies.length > 0){
        console.log(this.vacancies)
        this.load = false
      }
      else{
        this.load = false
      }
    })
  }
}
